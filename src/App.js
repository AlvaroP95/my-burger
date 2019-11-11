import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containersSmart/BurgerBuilder/BurgerBuilder';
import Checkout from './containersSmart/Checkout/Checkout';
import Orders from './containersSmart/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
