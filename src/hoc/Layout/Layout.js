import React, {Component} from 'react';
import Helper from '../Helper/Helper';
import classes from './Layout.css';
import Toolbar from '../../componentsDumb/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componentsDumb/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer : false});
    }

    render(){
        return(
            <Helper>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler} 
                    open={this.state.showSideDrawer}
                />
                <main className={classes.content}>
                    {this.props.children}
                </main> 
            </Helper>
        )
    }
}

const mapStateToPros = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToPros)(Layout);
