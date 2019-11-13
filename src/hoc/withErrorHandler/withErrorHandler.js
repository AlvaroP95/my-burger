import React, {Component} from 'react'
import Modal from '../../componentsDumb/UI/Modal/Modal';
import Helper from '../Helper/Helper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount(){//dejar en null y 
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error  => {
                this.setState({error: error});
            }) 
        }
        
        componentWillUnmount(){//esto es por si tiene muchas páginas crearía un withErrorHandler por cada una
            // console.log("[withErrorHandler] will unmount", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return(
                <Helper>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Helper>
            )
        }
    }
}

export default withErrorHandler
