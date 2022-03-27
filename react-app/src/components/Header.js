import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>
            ----------------------------This is the
            header----------------------------
          </h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
