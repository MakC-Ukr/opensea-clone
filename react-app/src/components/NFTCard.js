import React from "react";
// import { useEffect, useState } from "react";
import { Card, Avatar, Button } from "web3uikit";
import "./NFTCard.css"
// import TokenInstance from "../classes/TokenInstance";

class NFTCard extends React.Component {
  // constructor(){
  //     super();
  // }

  render() {
    return (
      <div style={{ width: "275px" }}>
        <Card onClick={()=>{}} setIsSelected={()=>{}}>
          <div>
            <div style={{ alignItems: "center", display: "flex", gap: "5px"}}>
              <Avatar isRounded theme="image" size={250} image={this.props.tokenInstance.imageAddress} />
            </div>
            <p></p>
            <div style={{color: "black", fontSize: "18px"}} className="center">
              {this.props.tokenInstance.contractSymbol}
            </div>
            <div style={{color: "#68738D",fontSize: "12px"}} >
              {this.props.tokenInstance.contractName} #{this.props.tokenInstance.tokenId}
            </div>
            <Button isFullWidth text="Buy" theme="primary" />
          </div>
        </Card>
      </div>
    );
  }
}

export default NFTCard;

// https://ipfs.io/ipfs/bafybeifvwitulq6elvka2hoqhwixfhgb42l4aiukmtrw335osetikviuuu
