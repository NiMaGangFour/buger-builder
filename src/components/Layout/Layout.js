import React from "react";

import Aux from "../../hoc/Aux";

const Layout = props => (
  <Aux>
    <div>Toolbar, sideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default Layout;
