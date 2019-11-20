import React, { useState, useEffect } from 'react'
import Helper from '../../hoc/Helper/Helper';
import Burger from '../../componentsDumb/Burger/Burger';
import BuildControls from '../../componentsDumb/Burger/BuildControls/BuildControls';
import Modal from '../../componentsDumb/UI/Modal/Modal';
import OrderSummary from './../../componentsDumb/Burger/OrderSummary/OrderSummary';
import Spinner from '../../componentsDumb/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions  from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = props => {
    // constructor(props){ NOT MODERN
    //     super(props);
    //     this.state = {
    //         ...
    //     }
    // }
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout'); 
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true);
        }
        else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0 ;
    }

    const disabledInfo = {
        ...props.ings
    };

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
            
    let burger = props.error ? 
        <p>Ingredients can't be loaded</p>
        :
        <Spinner />;
    
    if(props.ings){
        burger = (
            <Helper>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                />
            </Helper>
        );

        orderSummary = <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
    />;
    }

    return (
        <Helper>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
                
            </Modal>
            {burger}
        </Helper>
    )
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));