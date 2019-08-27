import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Buger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Auth</NavigationItem>
  </ul>
);

export default NavigationItems;
