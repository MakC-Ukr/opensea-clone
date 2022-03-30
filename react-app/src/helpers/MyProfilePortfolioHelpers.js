import marketPlace from '../marketPlace'
import TokenInstance from "../classes/TokenInstance";
import Web3 from 'web3';
import firebase from "../initFirebase";
import { Moralis } from "moralis";
import NftSaleCard from '../components/NftSaleCard'

let web3 = setupWeb3();


function setupWeb3() {
  try {
    let temp;
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.request({ method: "eth_requestAccounts" });
      temp = new Web3(window.ethereum);
    } else {
      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/3653806d884b401498e7a07f3f325d2e"
      );
      temp = new Web3(provider);
    }
    return temp;
  } catch (err) {
    console.log(err);
    return new Web3();
  }
}

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

async function fetchData(self) {
  try {
    const serverUrl = "https://svavn3d0nahx.usemoralis.com:2053/server";
    const appId = "PMZvz1zRzlE7BQ6YhB4Q7exyWJrWOITDV11N9Bhh";
    const masterKey = "IBHV8ghGW9VAGvwQyc1XVFWUCAoeFVr4jkCFA2Ij";
    // await delay(0.5); // needed delay
    await Moralis.start({ serverUrl, appId, masterKey });
    let options1 = { chain: "rinkeby", address: self.props.connectedAccount };
    const rinkebyNfts = await Moralis.Web3API.account.getNFTs(options1);
    rinkebyNfts['result'].forEach(async function (e) {
      let url = e['token_uri'];
      const temp1 = await fetch(url);
      const temp2 = await temp1.json();
      const imgAddr = temp2.image;
      e.MyImageAddr = imgAddr;
    }
    );
    await delay(0.3); // needed delay
    self.setState({ myPortfolio: rinkebyNfts["result"] });
  } catch (err) {
    console.log(err);
  }
}

async function checkIfContractIsApproved(_contractAddress, _tokenId, _seller, _connectedAccount) {
  try {
    const isApproved = await marketPlace.methods.isTokenApproved(_contractAddress, _tokenId, _seller).call();
    if (!isApproved) {
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "_approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      let instance = new web3.eth.Contract(contractABI, _contractAddress);
      await instance.methods.setApprovalForAll(marketPlace.options.address, true).send({ from: _connectedAccount });
    }
  } catch (err) {
    console.log(err);
  }
}

const onSellToken = async (_seller, _contractAddress, _tokenId, _connAcc, _priceInEther, _contractSymbol, _contractName, _imageAddress) => {
  try {
    const db = firebase.database();
    let _priceInWei = web3.utils.toWei(String(_priceInEther), "ether");
    const message = web3.eth.abi.encodeParameters(
      ["address", "address", "uint256", "uint256"],
      [_seller, _contractAddress, _tokenId, _priceInWei]
    );
    const hashedMessage = web3.utils.sha3(message);
    let accs = await window.ethereum.request({
      method: "eth_accounts",
    });

    checkIfContractIsApproved(_contractAddress, _tokenId, _seller, accs[0]);

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, accs[0]],
    });


    const r = signature.slice(0, 66); const s = "0x" + signature.slice(66, 130); const v = parseInt(signature.slice(130, 132), 16);

    const dbRef = db.ref("signs");
    let newDbRef = dbRef.push();
    newDbRef.set({
      listingId: "1",
      contractAddress: _contractAddress,
      tokenId: _tokenId,
      priceInEther: _priceInEther,
      contractSymbol: _contractSymbol,
      contractName: _contractName,
      imageAddress: _imageAddress,
      hashedMessage,
      seller: accs[0], //changed it recently
      v,
      r,
      s
    });
  } catch (err) {
    console.log(err);
  }
};


function getCardsAsList(moralisData, connectedAccount) {
  try {
    const result = [];
    let i_key = 0;
    moralisData.forEach(async function (e) {
      let imgAddr = e['MyImageAddr'];
      let thisInstance = new TokenInstance(e["token_address"], e["token_id"], e["name"], e["symbol"], imgAddr);
      result.push(<NftSaleCard
        key={i_key++}
        tokenInstance={thisInstance}
        onClick={(priceToSell) => {
          onSellToken(e["owner_of"], e["token_address"], e["token_id"], connectedAccount, priceToSell, e["symbol"], e["name"], imgAddr);
        }}
        tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
      />);
    }
    )
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}



export { delay, fetchData, checkIfContractIsApproved, setupWeb3, getCardsAsList, onSellToken }