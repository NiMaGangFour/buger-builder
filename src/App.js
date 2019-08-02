import React, { Component } from "react";
import "./App.css";

import BurgerBuilder from "./containers/BugerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
