import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedOrderForm = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedOrderForm[controlName]
    };
    updatedFormElement.value = event.target.value;
    console.log(updatedFormElement.value);
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    // console.log(updatedFormElement.valid);
    updatedOrderForm[controlName] = updatedFormElement;

    let formIsValid = true;
    for (let controlName in updatedOrderForm) {
      formIsValid = updatedOrderForm[controlName].valid && formIsValid;
    }

    this.setState({ controls: updatedOrderForm, formIsValid: formIsValid });

    console.log(event.target.value);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = (
      <div>
        <h4>Enter Your Account Details to Login</h4>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </div>
    );
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.orderHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
