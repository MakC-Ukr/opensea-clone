import React from "react";
import { Card, Avatar, Button } from "web3uikit";
import logo from '../images/eth-logo.png'; // Tell webpack this JS file uses this image

class BuyCardNEW extends React.Component {
  render() {
    return (
      <div style={{ width: "275px" }}>
        <Card onClick={() => { }} setIsSelected={() => { }}>
          <div>
            <div style={{ alignItems: "center", display: "flex", gap: "5px" }}>
              <Avatar
                isRounded
                theme="image"
                size={250}
                image={this.props.marketListing.imageAddress}
              />
            </div>
            <p></p>
            <div style={{ color: "black", fontSize: "18px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {this.props.marketListing.contractSymbol}
              <div style={{ flexDirection: "row" }}>
                {this.props.marketListing.priceInEther}
                <img src={logo} alt="Eth" style={{ height: "18px" }}></img>
              </div>
            </div>
            <div style={{ color: "#68738D", fontSize: "12px" }}>
              {this.props.marketListing.contractName} #
              {this.props.marketListing.tokenId}
            </div>
            <Button
              isFullWidth
              text="Buy"
              theme="primary"
              onClick={() => {
                try {
                  this.props.onClick();
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default BuyCardNEW;

/* Example of using: <NftBuyCard
      tokenInstance={tokenInstanceExample}
      onClick={onBuyToken}
      tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
      salePrice={"1"}>
      </NftBuyCard> */
