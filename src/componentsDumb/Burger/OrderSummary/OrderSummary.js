import React, {Component} from 'react'
import Helper from '../../../hoc/Helper/Helper';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component{
    //This could be a functional component, doesn't have to be a class
    componentDidUpdate(){
        // console.log('[OrderSummary] did Update!')
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return ( 
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>    {igKey}: 
                    </span>&nbsp;{this.props.ingredients[igKey]}
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
                <h4>$ {this.props.price.toFixed(2)}</h4>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Helper>
        )
    }
}
export default OrderSummary
