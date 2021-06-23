import * as actionType from '../actions/actionType';
import {checkValidity} from '../../shared/utility';

function inputDecalare (){
    let input = {};
    switch(arguments[0]){
        case('input'):  input = {
            elementType: arguments[0],
            elementConfig: {
                type: arguments[1],
                placeholder: arguments[2]
            },
            value: '',
            validation: {
                required: true,
                valid: false,
                lengthCheck: arguments[3] ? {
                    length: arguments[4]
                } : null,
                regexCheck: arguments[5] ? {
                    regex: arguments[6]
                } :null
            },
            touched : false,
        }; break;
        case ('select'): input = {
            elementType: arguments[0],
            elementConfig: {
                options: [
                    {value:arguments[1], displayValue:arguments[2]},
                    {value:arguments[3], displayValue:arguments[4]},
                ]
            },
            value: arguments[1],
            validation: null,
            touched : false,
        }; break;
        default: input = {
            elementType: arguments[0],
            elementConfig: {
                type: arguments[1],
                placeholder: arguments[2]
            },
            value: '',
            validation: {
                required: true,
                valid: false
            },
            touched : false,
        }
    }
return input;           
} 

const iniitalState = {
    orderForm: {
        name: inputDecalare ('input','text','Your Name',false,'',false),
        mail: inputDecalare('input','email','Your Mail',false,'',true,"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]+$"),
        contact: inputDecalare('input','tel','Your Contact',true,10,false),
        Street: inputDecalare('input','text','Street Address',false,'',false),
        zipCode: inputDecalare('input','text','Zip Code',true,6,false),
        country: inputDecalare('input','text','Country',false,'',false),
        deliveryMethod: inputDecalare('select','fastest','Fastest','cheapest','Cheapest')
    },
    formisValid: false,
    orders: [],
    loading: false,
    orderHandled: false
}


const reducer = (state = iniitalState, action) => {
    if(action.type === actionType.INPUT_CHANGE){        
        let formisValid = true;
        const reqInput = {...state.orderForm[action.inputName]};        
        reqInput.value = action.inputValue;
        if(reqInput.validation){
            reqInput.validation.valid = checkValidity(reqInput.value,reqInput.validation);
        } 
        
        reqInput.touched = true;
        const orderForm = {...state.orderForm};
        
        orderForm[action.inputName] = reqInput;
        for(let field in orderForm){
            if(orderForm[field].validation){
                formisValid = formisValid && orderForm[field].validation.valid;
            }
        }
        return{
            ...state,
            orderForm: orderForm,
            formisValid: formisValid
        };
        
    }
    else if(action.type === actionType.PURCHASE_BURGER_SUCCESS){
        return {
            ...state,
            loading: false,
            orderHandled: true,
            orders: state.orders.concat({
                ...action.orderData,
                id: action.orderId
            })
        }        
    }
    else if(action.type === actionType.PURCHASE_BURGER_FAILED){
        return{
            ...state,
            loading: false,
            orderHandled: true
        }
    }
    else if(action.type === actionType.PURCHASE_BURGER_START){
        return{
            ...state,
            loading: true
        }
    }
    else if(action.type === actionType.PURCHASE_INIT){
        for(let key in state.orderForm){
            state.orderForm[key].value = '';
        }
        return{
            ...state,
            orderHandled: false
        }
    }
    return state;
}

export default reducer;