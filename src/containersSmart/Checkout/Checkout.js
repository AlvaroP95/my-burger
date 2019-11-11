import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../componentsDumb/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


export default class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){ //ESTA DEPRECADO EL WILL
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else{
                ingredients[param[0]] = +param[1];
            }
            //el + es para que se convierta en numero
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        )
    }
}
