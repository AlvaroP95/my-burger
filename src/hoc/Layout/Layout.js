import React, {Component} from 'react';
import Helper from '../Helper/Helper';
import classes from './Layout.css';
import Toolbar from '../../componentsDumb/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componentsDumb/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
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

export default Layout;
