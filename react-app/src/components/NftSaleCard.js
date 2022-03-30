import React from "react";
import { Card, Avatar, Button } from "web3uikit";


function handleChange(event,self) {
  self.setState({ value: event.target.value });
}



class NftSaleCard extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }



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
            <div style={{ color: "#68738D", fontSize: "12px", display: 'flex', flexDirection: 'row', alignContent: 'space-evenly' }}>
                {this.props.tokenInstance.contractName} #
                {this.props.tokenInstance.tokenId}
              <div style={{ width: "60px" }}>
                <input value={this.state.value} onChange={(event) => {handleChange(event, this)}} style={{ width: "40px", height: "8px" } }/>
              </div>
            </div>
            <Button
              isFullWidth
              text="Sell"
              theme="primary"
              onClick={() => {
                this.props.onClick(
                  this.state.value
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



/* Example of using:  <NftSaleCard
        tokenInstance={tokenInstanceExample}
        onClick={onSellToken}
        tokenOwner="0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"
        salePrice={web3.utils.toWei("1", "ether")}
      /> */