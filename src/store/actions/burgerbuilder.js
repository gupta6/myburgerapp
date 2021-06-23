import * as actionType from './actionType';
import axios from 'axios';

export const addIngredients = ingredientType => {
    return{
        type: actionType.ADD_INGREDIENTS,
        ingredientType: ingredientType
    }
}

export const removeIngredients = ingredientType => {
    return{
        type: actionType.REMOVE_INGREDIENTS,
        ingredientType: ingredientType
    }
}

const setIngredients = (ingredients) => {
    return{
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://myburger-app-b7368-default-rtdb.firebaseio.com/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed(error));
        });
    }
}