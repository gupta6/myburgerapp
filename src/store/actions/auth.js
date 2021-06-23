import axios from 'axios';

import * as actionType from './actionType';

const authStart = () => {
    return{
        type: actionType.AUTH_START
    }
}

const authSuccess = (token,userId) => {
    return{
        type: actionType.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

const authFail = err => {
    return{
        type: actionType.AUTH_FAILED,
        error: err
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        },expirationTime * 1000);
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionType.AUTH_LOGOUT
    }
}

export const auth = (email,password,signup) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTgN4pyZRRh76ttd2T_uQce9azAosprq4';
        if(!signup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTgN4pyZRRh76ttd2T_uQce9azAosprq4'
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }        
        
        axios.post(url,authData)
        .then(response => {
            const expirationDate =  new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    } 
}

export const checkAuthStatus = () => {
    const token = localStorage.getItem('token');    
    
    return dispatch => {
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() -new Date().getTime())/1000))
            }
            else{
                dispatch(authLogout());
            }
        }
    }
}