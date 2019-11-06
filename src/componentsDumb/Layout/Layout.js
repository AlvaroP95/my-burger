import React from 'react';
import Helper from '../../hoc/Helper';
import App from '../../App';
import classes from './Layout.css';

const layout = (props) => (
    <Helper>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main> 
    </Helper>
)

export default layout;
