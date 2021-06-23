import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];    

    for (let ingredient in props.ingredients) {
        ingredients.push({name: ingredient, amount: props.ingredients[ingredient]});
    }    
    
    const ingredientsList = ingredients.map(ig => <span key={ig.name} style={{display:'inline-block',padding:'5px',margin:'0 8px',border: '1px solid #eee'}}>
        {ig.name}: ({ig.amount})</span>);

  
    return(
        <div className={classes.order}>
            {/* <p>Ingredients: <span style={{textTransform:'capitalize'}}>{ingredientsList}</span> </p> */}
            <p>Ingredients: {ingredientsList} </p>
            <p>Price: Rs. <strong>{props.price}</strong></p>
        </div>
    );
}

export default order;