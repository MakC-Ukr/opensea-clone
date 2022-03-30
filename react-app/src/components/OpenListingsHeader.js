import React from "react";
import { Button } from "web3uikit";
import ListingsHead from "../images/ListingsHead.png";
import OnlyPP from '../images/OnlyPP.png'

class OpenListingsHeader extends React.Component {


  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={OnlyPP}
          alt="Wallet"
          style={{ width: "100%" }}
        ></img>
        <img
          src={ListingsHead}
          alt="My profile"
          style={{ width: "100%" }}
        ></img>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            href={
              "https://rinkeby.etherscan.io/address/" +
              this.props.connectedAccount
            }
            style={{ textDecoration: "none" }}
          >
            <Button
              icon="arrowCircleRight"
              text={
                this.props.connectedAccount === "a"
                  ? "Wallet not connected"
                  : this.props.connectedAccount.substring(0, 6) +
                  "..." +
                  this.props.connectedAccount.substring(38, 42)
              }
              theme="primary"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default OpenListingsHeader;