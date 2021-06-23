import * as actionType from '../actions/actionType';

const iniitalState = {
    ingredients: null,
    price: 30, 
    error: false,
    building: false
}

const INGREDIENTS_PRICE = {
    salad: 5,
    cheese: 10,
    bacon: 10,    
    meat: 20 
}

const reducer = (state = iniitalState, action) => {
    
    if(action.type === actionType.ADD_INGREDIENTS){
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] + 1
            },
            price: state.price + INGREDIENTS_PRICE[action.ingredientType],
            building: true
        }
        
    } 

    else if(action.type === actionType.REMOVE_INGREDIENTS){
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] - 1
            },
            price: state.price - INGREDIENTS_PRICE[action.ingredientType],
            building: true
        }
    } 
    else if(action.type === actionType.SET_INGREDIENTS){
        return {
            ...state,
            ingredients: action.ingredients,
            error: false,
            price: 30,
            building: false
        }
    }
    else if(action.type === actionType.FETCH_INGREDIENTS_FAILED){
        return {
            ...state,
            error: true
        }
    }
    return state;
}

export default reducer;