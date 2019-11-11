import React, { Component } from 'react'
import Button from '../../../componentsDumb/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../componentsDumb/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault(); 
        this.setState({loading: true});
        const order = {
            customer: {
                address: {
                    country: 'Boquita',
                    street: 'Teststreet 1',
                    zipCode: '42069'
                },
                email: 'test@test.com',
                name: 'Coquito Loco',
            },
            deliveryMethod: 'fastest',
            ingredients: this.props.ingredients,
            price: this.props.price
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})               
            })
    }
    render() {
        let form = (            
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
                <input className={classes.Input} type="text" name="Postal Code" placeholder="Your Postal Code"/>
                <Button 
                    clicked={this.orderHandler}
                    btnType="Success">ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }
}
