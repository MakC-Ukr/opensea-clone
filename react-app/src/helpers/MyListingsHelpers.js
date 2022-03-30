import { Avatar, Button } from 'web3uikit';
import firebase from '../initFirebase'
import MarketListing from '../classes/MarketListing'
import logo from '../images/eth-logo.png'; // Tell webpack this JS file uses this image
import marketPlace from '../marketPlace'
import Web3 from 'web3';

let web3 = new Web3();

function getListingsData(_connectedAccount) {
    try {
        const db = firebase.database();
        const dbRef = db.ref("signs");
        const tempArr = [];

        dbRef.on("value", (snapshot) => {
            const receivedData = snapshot.val();
            for (const item in receivedData) {
                if (receivedData[item]['seller'] === _connectedAccount) {
                    let singleData = receivedData[item];
                    tempArr.push({
                        'ML': new MarketListing(singleData['listingId'], singleData['contractAddress'], singleData['tokenId'], singleData['seller'], singleData['priceInEther'], singleData['contractSymbol'], singleData['contractName'], singleData['imageAddress'], singleData['hashedMessage'], singleData['v'], singleData['r'], singleData['s']),
                        'del': item
                    });// del passes the unique id that is generated for this listing by firebase. This ID is passed ot cancelling funciton so that it is easier to remove this record from the Realtime Database
                }
            }
        }
        );

        return tempArr.map(
            (e) => {
                return [
                    <Avatar isRounded image={e['ML']['imageAddress']} theme="image" />,
                    e['ML']['contractName'],
                    e['ML']['tokenId'],
                    <a href={'https://rinkeby.etherscan.io/address/' + e['ML']['contractAddress']}>
                        {e['ML']['contractAddress']}
                    </a>,
                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                        {e['ML']['priceInEther']}
                        <img src={logo} alt=" eth" style={{ height: "18px" }} />
                    </div>,

                    <Button
                        color="red"
                        onClick={
                            async () => {
                                let x = String('signs/' + e['del']);
                                var adaRef = firebase.database().ref(x);
                                await adaRef.remove()
                                await marketPlace.methods.cancelListing(
                                    e['ML']['contractAddress'],
                                    e['ML']['tokenId'],
                                    web3.utils.toWei(String(e['ML']['priceInEther'])).toString()
                                ).send({ from: _connectedAccount });
                            }
                        }
                        text="Cancel"
                        theme="colored"
                        type="button"
                    />
                ]
            }
        )
    } catch (err) {
        console.log(err);
    }
}


export { getListingsData }