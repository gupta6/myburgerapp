import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your tasty burger!</h1>
            <div>
                <Burger ingredients = {props.ingredients}></Burger>
            </div>
            <Button btnType='Success' clicked={props.continue}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </div>
        
    )
}

export default checkoutSummary;