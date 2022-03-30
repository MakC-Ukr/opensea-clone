import React from "react";
import {TabList, Tab, } from 'web3uikit'
import MyProfile from "../pages/MyProfile"
import OpenListings from '../pages/OpenListings'


class Header extends React.Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: 'flex', flexDirection: 'row', margin: "0 auto", width: "50%", justifyContent:"space-around"}}>
            <TabList tabStyle="bulbSeperate">
              <div onClick={this.props.showListings}>
                <Tab tabKey={1} tabName="Listings" />
              </div> 
              <Tab isDisabled tabKey={2} tabName="Search"/>
              <div onClick={this.props.showProfilePage}>
                <Tab tabKey={3} tabName="My Profile"/>
              </div>
            </TabList>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
