import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.9,
  bacon: 1.5,
  cheese: 1.0,
  meat: 2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map((igKey, index) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });

    console.log(sum);
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: ingredients
    });
    this.updatePurchasableState(ingredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedCount;

    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: ingredients
    });
    this.updatePurchasableState(ingredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Siyu",
    //     address: {
    //       street: "Hytten Place",
    //       zipCode: "2617",
    //       country: "Australia"
    //     },
    //     email: "nimafour@gmail.com"
    //   },
    //   deliveryMethod: "E饿了么"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(error);
    //   });

    const queryParms = [];
    for (let i in this.state.ingredients) {
      queryParms.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const querySting = queryParms.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + querySting
    });
    // alert("Continue!");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    //console.log(disabledInfo);
    //{ salad: fales, cheese: true, .....}

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredientH={this.addIngredientHandler}
            removeIngredientH={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchaseH={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelledH={this.purchaseCancelHandler}
          purchaseContinuedH={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
