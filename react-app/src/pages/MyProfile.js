import React from "react";
import { TabList, Tab, Icon } from "web3uikit";
import MyProfileHeader from '../components/MyProfileHeader'
import MyProfilePortfolio from '../components/MyProfilePortfolio'
import MyListingsTable from '../components/MyListingsTable'
require('dotenv').config()





class MyProfile extends React.Component {

  render() {
    return (
        <div>
        <MyProfileHeader connectedAccount = {this.props.connectedAccount}/>

        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName={<div style={{ display: "flex" }}> <Icon fill="#000000" size={24} svg="copy" />{" "} <span style={{ paddingLeft: "4px" }}>Collected</span></div>}>
            <MyProfilePortfolio connectedAccount = {this.props.connectedAccount}/>
          </Tab>
          <Tab tabKey={2} tabName={<div style={{display: 'flex'}}><Icon fill="black" size={22} svg="bell"/><span style={{paddingLeft: '4px'}}>Listings{' '}</span></div>}>
            <MyListingsTable connectedAccount = {this.props.connectedAccount}/>
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default MyProfile;


// Usage: <MyProfile connectedAccount = {this.state.connectedAccount}/>