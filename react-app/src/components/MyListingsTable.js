import React from "react";
import { Table } from 'web3uikit';
import {getListingsData} from '../helpers/MyListingsHelpers'

let myListingsData;

class MyListingsTable extends React.Component {

  constructor(props) {
    super();
    myListingsData = getListingsData(props.connectedAccount); // maybe transfer it to component did mount ?
  }





  render() {
    return (
      <div style={{ alignContent: "center" }}>
        <div style={{ width: "90%", height: "auto", margin: "0 auto", padding: "10px", position: "relative" }}>
          <h3> Active Listings </h3>
          <Table
            columnsConfig="2fr 1fr 2fr 3fr 1fr 2fr"
            data={myListingsData}
            header={[
              <span>Item</span>,
              <span>Name</span>,
              <span>Token ID</span>,
              <span>Contract Address</span>,
              <span>Unit price</span>,
              <span>Action</span>,
            ]}
            maxPages={3}
            onPageNumberChanged={function noRefCheck() { }}
            pageSize={5}
          />
        </div>
      </div>
    );
  }
}
export default MyListingsTable;