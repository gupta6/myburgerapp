import axios from 'axios';

import * as actionType from './actionType';


const getOrdersSucsess = orderArr => {  
    return {
        type: actionType.GET_ORDERS_SUCCESS,
        orderArr: orderArr
    }
}

const getOrdersFailed = () => {
    return{
        type: actionType.GET_ORDERS_FAILED
    }
}



export const getOrders = (token,userId) => {
    return dispatch => {
        
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('https://myburger-app-b7368-default-rtdb.firebaseio.com/orders.json'+queryParams).then(response => {
            let orderArr = [];
            for(let key in response.data){
                orderArr.push({...response.data[key], id: key});
            }
            
            dispatch(getOrdersSucsess(orderArr));
        }).catch(error => {
            dispatch(getOrdersFailed());            
        })
    }
}