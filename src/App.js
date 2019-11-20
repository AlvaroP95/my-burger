import React, { useEffect, Suspense } from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containersSmart/BurgerBuilder/BurgerBuilder';
import Logout from './containersSmart/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Spinner from './componentsDumb/UI/Spinner/Spinner';

//Estos async son para renderear el contenido de las tabs (checkout, orders y auth) solo si se va a dicha página
const Checkout = React.lazy(() => {
  return import('./containersSmart/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containersSmart/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containersSmart/Auth/Auth')
})

const app = props => {
  //if has an empty Arry it only renders when its mounted
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []) 

  let routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />}/>
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        {/* Auth is here too because if not its code will disappear */}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={ <Spinner /> }>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
//withRouter is needed because it is wrapping connect which wraps app
