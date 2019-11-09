import React, {Component} from 'react';
import classes from './Modal.css';
import Helper from '../../../hoc/Helper/Helper';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate (nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children 
        //esta linea tiene que estar porque el Spinner es un children y entonces no se renderizaría 
        
    }

    componentDidUpdate(){
        console.log('[Modal] did Update!')
    }

    render(){
        return (
            <Helper>
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}
                />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Helper>
        )
    }
}


export default Modal;
