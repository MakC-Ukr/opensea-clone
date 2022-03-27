import React from "react";
import { Card, Avatar, Button } from "web3uikit";

class NftSaleCard extends React.Component {
  render() {
    return (
      <div style={{ width: "275px" }}>
        <Card onClick={() => {}} setIsSelected={() => {}}>
          <div>
            <div style={{ alignItems: "center", display: "flex", gap: "5px" }}>
              <Avatar
                isRounded
                theme="image"
                size={250}
                image={this.props.tokenInstance.imageAddress}
              />
            </div>
            <p></p>
            <div
              style={{ color: "black", fontSize: "18px" }}
              className="center"
            >
              {this.props.tokenInstance.contractSymbol}
            </div>
            <div style={{ color: "#68738D", fontSize: "12px" }}>
              {this.props.tokenInstance.contractName} #
              {this.props.tokenInstance.tokenId}
            </div>
            <Button
              isFullWidth
              text="Sell"
              theme="primary"
              onClick={() => {
                this.props.onClick(
                  this.props.tokenOwner,
                  this.props.tokenInstance.contractAddress,
                  this.props.tokenInstance.tokenId,
                  this.props.salePrice
                );
              }}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default NftSaleCard;

// https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu


/* Example of using:  <NftSaleCard
        tokenInstance={tokenInstanceExample}
        onClick={onSellToken}
        tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
        salePrice={web3.utils.toWei("1", "ether")}
      /> */