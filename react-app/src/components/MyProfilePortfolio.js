import React from "react";
import NftSaleCard from "./NftSaleCard";
import { Moralis } from "moralis";
import TokenInstance from "../classes/TokenInstance";
import Web3 from 'web3';
import MyPlaceHolder from '../components/MyPlaceHolder'
import firebase from "../initFirebase";
import 'firebase/compat/database';
import MarketListing from '../classes/MarketListing'

const db = firebase.database();

function getCardsAsList(moralisData, connectedAccount) {
  const result= [];
  let i_key= 0;
  moralisData.forEach(function (e) {
    let imgAddr = JSON.parse(e.metadata)['image'];
    let thisInstance = new TokenInstance(e["token_address"], e["token_id"], e["name"], e["symbol"],imgAddr);
    result.push (<NftSaleCard
        key={i_key++}
        tokenInstance = {thisInstance}
        onClick={() => {
          let priceToSell = '1';
          onSellToken(e["owner_of"], e["token_address"], e["token_id"], connectedAccount, String(web3.utils.toWei(priceToSell,'ether')),e["symbol"],e["name"], imgAddr);
        }}
        tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
        salePrice=''/>);
    });
    return result;
}

let web3 = new Web3();
const onSellToken = async (_seller, _contractAddress, _tokenId, _connAcc, _priceInWei, _contractSymbol, _contractName, _imageAddress) => {
  const message = web3.eth.abi.encodeParameters(
    ["address", "address", "uint256", "uint256"],
    [_seller, _contractAddress, _tokenId, _priceInWei]
  );
  const hashedMessage = web3.utils.sha3(message);
  let accs = await window.ethereum.request({
    method: "eth_accounts",
  });
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [hashedMessage, accs[0]],
  });
  const r = signature.slice(0, 66);
  const s = "0x" + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);
  // console.log({ hashedMessage,v, r, s });

  const dbRef = db.ref("signs");
  let newDbRef= dbRef.push();
  newDbRef.set({
    listingId: "1",
    contractAddress : _contractAddress,
    tokenId : _tokenId,
    connAcc : _connAcc,
    priceInEth: "1",
    contractSymbol : _contractSymbol,
    contractName : _contractName,
    // imageAddress : _imageAddress,
    hashedMessage,  
    v, 
    r, 
    s
  });
};

// Props required: connectedAccount
class MyProfilePortfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      myPortfolio: [],
    };
  }

  componentDidMount() {
    function delay(n) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
      });
    }
    async function fetchData(self) {
      const serverUrl = "https://svavn3d0nahx.usemoralis.com:2053/server";
      const appId = "PMZvz1zRzlE7BQ6YhB4Q7exyWJrWOITDV11N9Bhh";
      const masterKey = "IBHV8ghGW9VAGvwQyc1XVFWUCAoeFVr4jkCFA2Ij";
      await delay(0.2); // needed delay
      await Moralis.start({ serverUrl, appId, masterKey });
      let options1 = { chain: "rinkeby", address: self.props.connectedAccount };
      const rinkebyNfts = await Moralis.Web3API.account.getNFTs(options1);
      self.setState({ myPortfolio: rinkebyNfts["result"] });
    }
    fetchData(this);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.myPortfolio.length > 0 ? (
          <div>
            <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap" , rowGap:"20px", columnGap:"30px", width: "88%", margin: "auto"}}>
              {getCardsAsList(this.state.myPortfolio, this.props.connectedAccount)}
            </div>
          </div>
        ) : (
          <MyPlaceHolder/>
        )}
      </div>
    );
  }
}

export default MyProfilePortfolio;
