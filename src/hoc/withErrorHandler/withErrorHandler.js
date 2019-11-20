import React from 'react';
import useHttpErrorHandler from '../../hoc/hooks/http-error-handler';
import Modal from '../../componentsDumb/UI/Modal/Modal';
import Helper from '../Helper/Helper';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        //I can array destructuring not because useHttpErrorHandler is a hook but because useHttpErrorHandler returns, casually, an array of two objects
        const [error, clearError] = useHttpErrorHandler(axios);

        return(
            <Helper>
                <Modal 
                    show={error}
                    modalClosed={clearError}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Helper>
        )
    }
}

export default withErrorHandler
