import React from "react";
import MyPlaceHolder from '../components/MyPlaceHolder'
import 'firebase/compat/database';
import { fetchData, getCardsAsList } from "../helpers/MyProfilePortfolioHelpers";








// Props required: connectedAccount
class MyProfilePortfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      myPortfolio: [],
      loadedImages: false,
    };
  }

  componentDidMount() {
    fetchData(this);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.myPortfolio.length > 0 ? (
          <div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", rowGap: "20px", columnGap: "30px", width: "88%", margin: "auto" }}>
              {getCardsAsList(this.state.myPortfolio, this.props.connectedAccount)}
            </div>
          </div>
        ) : (
          <MyPlaceHolder />
        )}
      </div>
    );
  }
}

export default MyProfilePortfolio;
