import * as actionType from '../actions/actionType';

const iniitalState = {
    orders: null,
    error: false, 
}

const reducer = (state=iniitalState, action) => {
    switch(action.type){
        case (actionType.GET_ORDERS_SUCCESS) :            
            return{
                orders: action.orderArr,
                error: false,
            }        
        
        case (actionType.GET_ORDERS_FAILED):
            return {
                ...state,
                error: true
            }        
        default: return state;      
    }
}

export default reducer;

