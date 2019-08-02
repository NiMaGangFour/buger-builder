import React from "react";
import Burger from "../../Burger/Burger";

const CheckoutSummary = props => {
  return (
    <div>
      <h1>Hope this burger is tasty！</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
    </div>
  );
};

export default CheckoutSummary;
