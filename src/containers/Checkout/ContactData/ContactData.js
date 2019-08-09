import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Modal/Input/Input";
import { identifier } from "@babel/types";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your zipCode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5
        },
        valid: false
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    }
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingrediencts: this.props.ingredients,
      price: Number.parseFloat(this.props.price).toFixed(2),
      orderData: formData
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

  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement.valid);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });

    console.log(event.target.value);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <div>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button btnType="Success">ORDER</Button>
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
