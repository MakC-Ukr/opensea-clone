import React, { useEffect, useState } from "react";
import MarketListing from '../classes/MarketListing'
import OpenListingsHeader from '../components/OpenListingsHeader'
import MyPlaceHolder from '../components/MyPlaceHolder'
import Web3 from "web3";
import firebase from "../initFirebase";
import 'firebase/compat/database';
import { getCardsAsList } from "../helpers/OpenListingsHelpers";
const db = firebase.database();

const OpenListings = (props) => {

    const [listingsData, setListingsData] = useState([]);

    useEffect(() => {
        try {
            const dbRef = db.ref("signs");
            dbRef.on("value", (snapshot) => {
                const receivedData = snapshot.val();
                const tempArr = [];
                for (const item in receivedData) {
                    let singleData = receivedData[item];
                    tempArr.push(new MarketListing(singleData['listingId'], singleData['contractAddress'], singleData['tokenId'], singleData['seller'], singleData['priceInEther'], singleData['contractSymbol'], singleData['contractName'], singleData['imageAddress'], singleData['hashedMessage'], singleData['v'], singleData['r'], singleData['s']));
                }
                setListingsData(tempArr);
            }
            );
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <OpenListingsHeader connectedAccount={props.connectedAccount} />
            <p />
            <div style={{ textAlign: "center" }}>
                {listingsData.length > 0 ?
                    (<div>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", rowGap: "20px", columnGap: "30px", width: "88%", margin: "auto" }}>
                            {getCardsAsList(listingsData, props.connectedAccount)}
                        </div>
                    </div>)
                    :
                    <MyPlaceHolder />
                }
            </div>

        </div>
    );
}

export default OpenListings;