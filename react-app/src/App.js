import './App.css';
import NFTCard from './components/NFTCard.js'
import TokenInstance from './classes/TokenInstance'

function App() {
  let tokenInstanceExample = new TokenInstance("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", "46960", "MultiFaucet NFT", "MFNFT", "https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu");

  return (
    <div>
      <h1>Hello world</h1>
      <NFTCard tokenInstance = {tokenInstanceExample}/>
    </div>
  );
}

export default App;
