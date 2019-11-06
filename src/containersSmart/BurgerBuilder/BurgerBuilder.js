import React, { Component } from 'react'
import Helper from '../../hoc/Helper';
import Burger from '../../componentsDumb/Burger/Burger';

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Helper>
                <Burger/>
                <div>Build Control</div>
            </Helper>
        )
    }
}