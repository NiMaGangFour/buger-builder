import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  //[const transformedIngredients = Object.keys(props.ingredients) ===> "salad", "bacon", "cheese", "meat"]
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      return <BurgerIngredient key={igKey + index} type={igKey} />;
    });
  });

  console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
