import React from "react";
import { Illustration } from 'web3uikit';

class MyPlaceHolder extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ fontFamily: "Poppins" }}>No items to display</h2>
        <div style={{ borderTopLeftRadius: "15px", backgroundColor: "#1E90FF" }}>
          <Illustration logo="pack" />
        </div>
      </div>
    );
  }
}
export default MyPlaceHolder;