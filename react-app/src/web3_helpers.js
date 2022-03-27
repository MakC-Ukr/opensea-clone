const connectWalletHandler = async () => 
{
  const { ethereum } = window;
  if (!ethereum) 
  {
    alert("Please install Metamask!");
    return;
  }
  let accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log("Found an account! Address: ", this.state.accounts[0]);

  return accounts;
};

const checkWalletIsConnected = async () => {

    if (!window.ethereum) {
    console.log("Make sure you have Metamask installed!");
    return;
  } else {
    console.log("Wallet exists! We're ready to go!")
  }
  
  let accounts = await window.ethereum.request({ method: "eth_accounts" });

  if (accounts.length !== 0) {
    return true;
  } else {
    return false;
  }
};


export {connectWalletHandler, checkWalletIsConnected};