import React, { Component } from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containersSmart/BurgerBuilder/BurgerBuilder';
import Logout from './containersSmart/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//Estos async son para renderear el contenido de las tabs (checkout, orders y auth) solo si se va a dicha página
const asyncCheckout = asyncComponent(() => {
  return import('./containersSmart/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containersSmart/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containersSmart/Auth/Auth')
})

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          {/* auth está pq si no "desaparece" su código y enotnces no se va al checkout de una anvorguesa que se empezó a construir y luego se "sign up to order" */}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));//withrouter se necesita pq se está envolviendo App con connect
