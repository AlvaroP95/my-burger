import React, { Component } from 'react'
import Helper from '../../hoc/Helper';
import Burger from '../../componentsDumb/Burger/Burger';

export default class BurgerBuilder extends Component {
    // constructor(props){ NO MODERNO
    //     super(props);
    //     this.state = {
    //         ...
    //     }
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
        return (
            <Helper>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Control</div>
            </Helper>
        )
    }
}