import authReducer from './auth';
import * as actionTypes from '../actions/actionType';

describe('auth reducer', () => {
    it('should return the initial state',()=>{
        expect(authReducer(undefined, {} )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should set the error property',()=>{
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_FAILED, error: {message: 'oops got an error'}} )).toEqual({
            token: null,
            userId: null,
            error: 'oops got an error',
            loading: false,
            authRedirectPath: '/'
        });
    });
})