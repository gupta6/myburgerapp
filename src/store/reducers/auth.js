import * as actionType from '../actions/actionType';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.AUTH_START: return{...state, loading: true, token: null, userId: null, error: null}
        case actionType.AUTH_SUCCESS: return{...state, token: action.token, userId: action.userId, loading:false}
        case actionType.AUTH_FAILED : return{...state, error: action.error.message, loading: false}
        case actionType.AUTH_LOGOUT: return{...state, token: null, userId: null}
        case actionType.SET_AUTH_REDIRECT_PATH: return {...state, authRedirectPath: action.path};    
        default: return state;
    }
}

export default reducer;