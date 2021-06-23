import * as actionType from './actionType';
import axios from 'axios';

export const inputChange = (value,name) => {
    return{
        type: actionType.INPUT_CHANGE,
        inputValue: value,
        inputName: name
    }
}

const burgerPurchaseSuccess = (data,id) => {
    return{
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderData: data,
        orderId: id
    }
}

const burgerPurchaseFailed = (err) => {
    return{
        type: actionType.PURCHASE_BURGER_FAILED,
        error: err
    }
}

const burgerPurchaseStart = () => {
    return{
        type: actionType.PURCHASE_BURGER_START
    }
}

export const burgerPurchase = (orders,token) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post('https://myburger-app-b7368-default-rtdb.firebaseio.com/orders.json?auth='+token,orders).then(response => {            
            dispatch(burgerPurchaseSuccess(orders,response.data.name));
        }).catch(error => {
            dispatch(burgerPurchaseFailed(error));           
        });
    }
}

export const purchaseInit = () => {
    return{
        type: actionType.PURCHASE_INIT
    }
}