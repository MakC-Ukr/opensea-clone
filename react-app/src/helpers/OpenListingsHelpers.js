import BuyCardNEW from '../components/BuyCardNEW'
import marketPlace from '../marketPlace'
import Web3 from 'web3';
import firebase from '../initFirebase'

const db = firebase.database();
const dbRef = db.ref("signs");

let web3 = new Web3();

const onBuyToken = async function (marketListing, _connectedAccount, _value) {
    try {
        await marketPlace.methods.buyNFT(
            marketListing.hashedMessage,
            marketListing.v,
            marketListing.r,
            marketListing.s,
            web3.utils.toWei(String(marketListing.priceInEther), "ether"),
            marketListing.contractAddress,
            marketListing.tokenId,
            marketListing.seller
        ).send(
            { value: _value, from: _connectedAccount }
        );


        dbRef.on("value", async (snapshot) => {
            const receivedData = snapshot.val();
            for (const item in receivedData) {
                if (receivedData[item]['contractAddress'] === marketListing.contractAddress &&
                    receivedData[item]['tokenId'] === marketListing.tokenId) {
                    let x = String('signs/' + item);
                    var adaRef = firebase.database().ref(x);
                    await adaRef.remove()
                }
            }
        }
        );
    } catch (err) {
        console.log(err);
    }

}

function getCardsAsList(listings, _connectedAccount) {
    try {
        const result = [];
        let i_key = 0;
        listings.forEach(function (thisInstance) {
            // let thisInstance = new TokenInstance(e["token_address"], e["token_id"], e["name"], e["symbol"],"https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu");
            result.push(<BuyCardNEW
                key={i_key++}
                marketListing={thisInstance}
                onClick={() => {
                    onBuyToken(thisInstance, _connectedAccount, web3.utils.toWei(thisInstance.priceInEther, "ether"));
                }}
            />);
        });
        return result;
    } catch (err) {
        console.log(err);
    }
}

export { onBuyToken, getCardsAsList }