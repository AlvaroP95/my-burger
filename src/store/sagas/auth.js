import * as actionsTypes from '../actions/actionsTypes';
import * as actions from '../actions/index'
import { delay } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects';
import axios from 'axios'

export function* logoutSaga(action){ 
    //I can do this 
    yield call([localStorage, 'removeItem'], "token")  
    yield call([localStorage, 'removeItem'], "localStorage")
    yield call([localStorage, 'removeItem'], "userId")  
    
    //Or this
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationTime');
    // yield localStorage.removeItem('userId');
    
    yield put( //dispatch a new action
        actions.logoutSucceed()
    )
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFrytgrLM18_7qgBiMQwPkJjgU3sPwweE';

    if(!action.isSignedUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFrytgrLM18_7qgBiMQwPkJjgU3sPwweE'
    }

    try{
        const response = yield axios.post(url, authData)
            
        const expirationDate = yield new Date(
            new Date().getTime() + 
            response.data.expiresIn * 1000
        );                
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        //los yield de localStorage y new Date son innecesarios

        yield put(actions.authSuccess(
            response.data.idToken, 
            response.data.localId, 
            //se llama localId en FIREBASE, por eso
        ))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch(error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if(!token){
        yield put(actions.logout());
    }
    else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            yield put(actions.logout());
        }
        else{
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
    }
}
