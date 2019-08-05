import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: null
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      //["salad", "1"]
      ingredients[param[0]] = +param[1];
    }
    console.log(ingredients);
    this.setState({
      ingredients: ingredients
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let checkoutSummary = (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutContinued={this.checkoutContinuedHandler}
        checkoutCancelled={this.checkoutCancelledHandler}
      />
    );
    return <div>{this.state.ingredients ? checkoutSummary : null}</div>;
  }
}

export default Checkout;
