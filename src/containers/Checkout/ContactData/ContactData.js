import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Modal/Input/Input";

class ContactData extends Component {
  state = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: ""
    },

    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your street"
      },
      value: ""
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your zipCode"
      },
      value: ""
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your country"
      },
      value: ""
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your email"
      },
      value: ""
    },

    deliveryMethod: {
      elementType: "input",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: ""
    }
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
    console.log(this.props);
  };
  render() {
    let form = (
      <div>
        <h4>Enter your contact data</h4>
        <form>
          <Input elementType="..." elementConfig="..." value="..." />
          <Input
            inputtype="input"
            type="text"
            name="email"
            placeholder="Your Email"
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            placeholder="Your Street"
          />
          <Input
            inputtype="input"
            type="text"
            name="postal"
            placeholder="Your Postal"
          />
          <Button clicked={this.orderHandler} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
