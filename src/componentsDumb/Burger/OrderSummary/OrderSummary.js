import React from 'react'
import Helper from '../../../hoc/Helper/Helper';
import Button from './../../UI/Button/Button';

const orderSummary = props => {
    //This could be a functional component, doesn't have to be a class

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return ( 
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>    {igKey}: 
                </span>&nbsp;{props.ingredients[igKey]}
            </li>
        )
    })

    return(
        <Helper>
            <h3>Your Order</h3>
            <p>A delicious burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>$ {props.price.toFixed(2)}</h4>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Helper>
    )
}
export default orderSummary
