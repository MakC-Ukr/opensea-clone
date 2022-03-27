import React from "react";
import { TabList, Tab, Icon } from "web3uikit";
import MyProfileHeader from '../components/MyProfileHeader'
import MyProfilePortfolio from '../components/MyProfilePortfolio'
require('dotenv').config();


class MyProfile extends React.Component {
  // constructor()
  // {
  //   super();
  //   this.state = {
  //     myPortfolio: []
  //   }
  // }


  

  render() {
    return (
        <div>
        <MyProfileHeader connectedAccount = {this.props.connectedAccount}/>

        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName={<div style={{ display: "flex" }}> <Icon fill="#000000" size={24} svg="copy" />{" "} <span style={{ paddingLeft: "4px" }}>Collected</span></div>}>
            <MyProfilePortfolio connectedAccount = {this.props.connectedAccount}/>
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default MyProfile;
