import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {    

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
            <Aux>
                <h3>Your order is</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button clicked={this.props.orderContinued} btnType="Success">CONTINUE</Button>
                <Button clicked={this.props.orderCanceled} btnType="Danger">CANCEL</Button>
            </Aux>
        )
    }
}

export default OrderSummary;