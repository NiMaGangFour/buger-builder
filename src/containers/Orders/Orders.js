import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    order: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(res.data);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        <Order />
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
// export default Orders;