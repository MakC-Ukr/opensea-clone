import React from "react";
import NftSaleCard from "./NftSaleCard";
import { Illustration } from "web3uikit";
import { Moralis } from "moralis";
import TokenInstance from "../classes/TokenInstance";
import Web3 from 'web3';
require("dotenv").config();

function getCardsAsList(moralisData) {
  const result= [];
  let i_key= 0;
  moralisData.forEach(function (e) {
    let thisInstance = new TokenInstance(e["token_address"], e["token_id"], e["name"], e["symbol"],"https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu");
    // console.log({ thisInstance });
    result.push (<NftSaleCard
        key={i_key++}
        tokenInstance = {thisInstance}
        onClick={() => {
          let priceToSell = '1';
          onSellToken(e["owner_of"], e["token_address"], e["token_id"], web3.utils.toWei(priceToSell,'ether') );
        }}
        tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
        salePrice=''/>);
    });
    return result;
}

let web3 = new Web3();
const onSellToken = async (_seller, _contractAddress, _tokenId, _priceInWei) => {
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
  console.log({ hashedMessage,v, r, s });
  console.log("sold");
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
      console.log(options1);
      const rinkebyNfts = await Moralis.Web3API.account.getNFTs(options1);
      self.setState({ myPortfolio: rinkebyNfts["result"] });
      console.log(rinkebyNfts["result"]);
    }
    fetchData(this);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.myPortfolio.length > 0 ? (
          <div>
            <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap" , rowGap:"20px", columnGap:"30px", width: "88%", margin: "auto"}}>
              {getCardsAsList(this.state.myPortfolio)}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: "Poppins" }}>No items to display</h2>
            <div
              style={{
                borderTopLeftRadius: "15px",
                backgroundColor: "#1E90FF",
              }}
            >
              <Illustration logo="pack" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyProfilePortfolio;
