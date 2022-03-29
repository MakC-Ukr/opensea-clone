import "./App.css";
// import NftSaleCard from "./components/NftSaleCard.js";
import React from "react";
// import TokenInstance from "./classes/TokenInstance";
import MyProfile from "./pages/MyProfile";
import Header from './components/Header'
import OpenListings from './pages/OpenListings'
import { Button } from "web3uikit";
// import Web3 from "web3";


// Initialize Firebase


// let web3 = new Web3();

/*const onSellToken = async (_seller, _contractAddress, _tokenId, _price) => {
  const message = web3.eth.abi.encodeParameters(
    ["address", "address", "uint256", "uint256"],
    [_seller, _contractAddress, _tokenId, _price]
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
*/


/*const onBuyToken = async(hashedMsg, v,r,s ,_seller, _contractAddress, _tokenId, _price, _value) => {
  await marketPlace.methods.buyItem(hashedMsg, v,r,s ,_seller, _contractAddress, _tokenId, _price).
  send({value: _value, from : accounts[0], gas : "3000000"})
}*/

const connectWalletHandler = async (self) => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Please install Metamask!");
  }
  try {
    let accs = await ethereum.request({
      method: "eth_requestAccounts",
    });
    self.setState({
      connectedAccount: accs[0],
    });
  } catch (err) {
    console.log(err);
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedAccount: 'a'
    };
  }

  componentDidMount () {
    const self = this;
    async function fetchData ()
    {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install Metamask!");
      }
      let accs = await ethereum.request({
        method: "eth_requestAccounts",
      });
      self.setState({
        connectedAccount: accs[0],
      });
    }

    fetchData().then(
      () => {
        console.log("Fetched Data: ", this.state);
      }
    );
  }

  render() {
  return (
      <div>
        <Header>
          {this.state.connectedAccount === 'a' ?
          <Button
            text={
                "Connect wallet first and reload the page"
            }
            onClick={() => {connectWalletHandler(this)}}
            theme="primary"
            />
            : ''
          }
          <MyProfile connectedAccount = {this.state.connectedAccount}/>
          {/* <OpenListings connectedAccount = {this.state.connectedAccount}/> */}
        </Header>
      </div>

      
    );
  }

}

export default App;
