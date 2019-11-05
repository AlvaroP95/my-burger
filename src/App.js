import React, { Component } from "react";
import Layout from './componentsDumb/Layout/Layout';
import BurgerBuilder from './containersSmart/BurgerBuilder/BurgerBuilder';

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
