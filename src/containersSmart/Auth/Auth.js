import React, { Component } from 'react';
import Input from '../../componentsDumb/UI/Input/Input'
import Button from '../../componentsDumb/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../componentsDumb/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: 'useThisFor@quickTesting.com',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: 'asdfgh',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignedUp: true
    }

    componentDidMount(){
        if( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ){
            this.props.onSetAuthRedirectPath();
        }
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(
            this.state.controls, 
            {
                [controlName]: updateObject(
                    this.state.controls[controlName],
                    {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                        touched: true
                    }
                )
            }
        );
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignedUp
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignedUp: !prevState.isSignedUp}
        })
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} 
            />
        ))

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <h3 style={{color: "#703B09", fontWeight: "bold"}}>{this.props.error.message}</h3>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >SWITCH TO {this.state.isSignedUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToPros = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToPros = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToPros, mapDispatchToPros)(Auth)


