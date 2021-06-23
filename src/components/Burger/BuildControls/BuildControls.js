import React from 'react';

import BuildControl from './BuildControl/BuildControl'; 
import classes from './BuildControls.css';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Cheese", type: "cheese"},
    {label: "Bacon", type: "bacon"},
    {label: "Meat", type: "meat"}
]

const buildControls = props => (
        <div className={classes.buildControls}>
            <p>Current price: <strong>{props.price}</strong></p>

            {controls.map(ingredient=>{
                return <BuildControl 
                key={ingredient.label} 
                label={ingredient.label} 
                add={()=>props.add(ingredient.type)} 
                remove={()=>props.remove(ingredient.type)}
                disable={props.disable[ingredient.type]}
                />
            })}            

            <button className={classes.OrderButton} 
            disabled={!props.purchasable} onClick={props.ordering}>{props.isAuthenticated ? 'Order Now': 'Sign Up for Order'}</button>
            
        </div>
    )


export default buildControls;