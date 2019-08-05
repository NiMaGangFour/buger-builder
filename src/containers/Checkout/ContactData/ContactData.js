import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    street: "",
    postal: ""
  };
  render() {
    return (
      <div>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="text" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postal" placeholder="Your Postal" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
