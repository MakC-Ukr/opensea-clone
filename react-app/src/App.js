import "./App.css";
// import NftSaleCard from "./components/NftSaleCard.js";
import React from "react";
// import TokenInstance from "./classes/TokenInstance";
import MyProfile from "./pages/MyProfile";
import Header from './components/Header'
import OpenListings from './pages/OpenListings'
import { Button } from "web3uikit";


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

function showProfilePage(self, boolean) {
  self.setState({
    onProfilePage:boolean,
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedAccount: 'a',
      onProfilePage : false
    };
  }

  componentDidMount() {
    const self = this;
    async function fetchData() {
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
        // console.log("Fetched Data: ", this.state);
      }
    );
  }

  

  render() {
    return (
      <div>
        <Header connectedAccount={this.state.connectedAccount}  
          showProfilePage = {() => {
              showProfilePage(this, true);
            }
          } 
          showListings = {() => {
              showProfilePage(this, false);
              console.log("HIII");
            }
          }
        >
          {this.state.connectedAccount === 'a' ?
            <Button
              text={
                "Connect wallet first and reload the page"
              }
              onClick={() => { 
                  try{
                    connectWalletHandler(this)
                  }  catch (err) 
                  {
                    console.log(err);
                  }
                }
              }
              theme="primary"
            />
            :
            ''
          }
        </Header>
        {
          this.state.onProfilePage === true ?
            <MyProfile connectedAccount={this.state.connectedAccount} />
            : <OpenListings connectedAccount={this.state.connectedAccount} />
        }



      </div>


    );
  }

}

export default App;
