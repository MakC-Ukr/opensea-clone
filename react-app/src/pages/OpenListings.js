import React from "react";
import MarketListing from '../classes/MarketListing'
import BuyCardNEW from '../components/BuyCardNEW'
import OpenListingsHeader from '../components/OpenListingsHeader'
import MyPlaceHolder from '../components/MyPlaceHolder'
import marketPlace from "../marketPlace"
import Web3 from "web3";


const web3 = new Web3();

function getCardsAsList(listings, _connectedAccount) {
    const result = [];
    let i_key = 0;
    listings.forEach(function (thisInstance) {
        // let thisInstance = new TokenInstance(e["token_address"], e["token_id"], e["name"], e["symbol"],"https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu");
        result.push(<BuyCardNEW
            key={i_key++}
            marketListing={thisInstance}
            onClick={() => {
                onBuyToken(thisInstance, _connectedAccount, '1000000000000000000');
            }}
        />);
    });
    return result;
}


const onBuyToken = async function (marketListing, _connectedAccount, _value) {
    await marketPlace.methods.buyNFT(
        marketListing.hashedMessage, 
        marketListing.v, 
        marketListing.r, 
        marketListing.s, 
        web3.utils.toWei(String(marketListing.priceInEther), "ether").toString(), 
        marketListing.contractAddress, 
        marketListing.tokenId, 
        marketListing.seller
    ).send(
            {value: _value, from : _connectedAccount}
    );
}


class OpenListings extends React.Component {
    constructor() {
        super();
        this.listingsData = [
            new MarketListing(0, '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b', '415918', '0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13', '1', 'MFNFT', 'MultiFaucet NFT', 'https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu','0xaeb885eae7ecc425b6a49bad5ef205e236b8ab5b400e2a7554cbf7610f22d943', '28', '0x4ec437d6ed046b242067d2c9ed22767999a842bb288f0b3c9cff270c893d46c3', '0x0b867556e7a36ebb1b887a6beedd467388f237c4a856665d701ae4e2883de665'),
            new MarketListing(1, '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b', '393421', '0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13', '1', 'MFNFT', 'MultiFaucet NFT', 'https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu','0xaeb885eae7ecc425b6a49bad5ef205e236b8ab5b400e2a7554cbf7610f22d943', '28', '0x4ec437d6ed046b242067d2c9ed22767999a842bb288f0b3c9cff270c893d46c3', '0x0b867556e7a36ebb1b887a6beedd467388f237c4a856665d701ae4e2883de665'),
            new MarketListing(2, '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b', '398230', '0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13', '1', 'MFNFT', 'MultiFaucet NFT', 'https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu','0xaeb885eae7ecc425b6a49bad5ef205e236b8ab5b400e2a7554cbf7610f22d943', '28', '0x4ec437d6ed046b242067d2c9ed22767999a842bb288f0b3c9cff270c893d46c3', '0x0b867556e7a36ebb1b887a6beedd467388f237c4a856665d701ae4e2883de665')
        ];
    }

    render() {
        return (
            <div>
                <h2>Open Listings</h2>
                <OpenListingsHeader connectedAccount={this.props.connectedAccount} />
                <p/>
                <div style={{ textAlign: "center" }}>
                    {this.listingsData.length > 0 ? 
                        (<div>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", rowGap: "20px", columnGap: "30px", width: "88%", margin: "auto" }}>
                                {getCardsAsList(this.listingsData, this.props.connectedAccount)}
                            </div>
                        </div>) 
                    :
                        <MyPlaceHolder/>
                    }
                </div>

            </div>




        );
    }
}

export default OpenListings;