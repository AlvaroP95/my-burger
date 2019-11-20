import React, { useState } from 'react';
import Helper from '../Helper/Helper';
import classes from './Layout.css';
import Toolbar from '../../componentsDumb/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componentsDumb/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    
    const sideDrawerClosedHandler = () =>{
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => { 
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return(
        <Helper>
            <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                closed={sideDrawerClosedHandler} 
                open={sideDrawerIsVisible}
            />
            <main className={classes.content}>
                {props.children}
            </main> 
        </Helper>
    )
}

const mapStateToPros = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToPros)(layout);
