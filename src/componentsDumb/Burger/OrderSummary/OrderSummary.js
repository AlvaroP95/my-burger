import React from 'react'
import Helper from '../../../hoc/Helper';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return ( 
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>    {igKey}: 
                    </span>&nbsp;{props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Helper>
            <h3>Your Order</h3>
            <p>A delicious burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Helper>
    )
}

export default orderSummary
