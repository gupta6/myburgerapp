import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        ordering: false  
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    purchasableHandler (ingredients) {
        let sum = 0;
        for(let key in ingredients){
            sum = sum + ingredients[key];
        }

        return sum > 0;
    }

    orderHandler = () => {        
        if(this.props.isAuth){
            this.setState({ordering: true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    orderCancelHandler = () => {
        this.setState({ordering: false});       
    }

    orderContinueHandler = () => {  
        // this.props.onPurchaseInit();      
        this.props.history.push({
            pathname: '/checkout'
        })
    }   

    render(){
        let burger = this.props.error ? <p>Ingredients are not loading</p> : <Spinner/>
        if(this.props.ings !== null){
            const disableInfo = {
                ...this.props.ings
            }
    
            for(let key in disableInfo){
                disableInfo[key] = disableInfo[key] <= 0;
            }

            burger = (
                <Aux>
            
                    <Burger ingredients={this.props.ings} />

                    <Modal show={this.state.ordering} modalclosed={this.orderCancelHandler}>
                        {this.state.loading ? <Spinner/>:
                        <OrderSummary 
                            ingredients={this.props.ings} 
                            price={this.props.price} 
                            orderCanceled={this.orderCancelHandler} 
                            orderContinued={this.orderContinueHandler}/>}
                    </Modal>
                    
                    <BuildControls 
                        price={this.props.price}
                        add={this.props.onAddIngredients} 
                        remove={this.props.onRemoveIngredients} 
                        disable={disableInfo}
                        purchasable={this.purchasableHandler(this.props.ings)}
                        ordering={this.orderHandler}
                        isAuthenticated={this.props.isAuth}/>                        
                </Aux>

                
            );
        }
        
        return burger;
    }
}

const mapStateToProps = state => {
    return{
        ings: state.bb.ingredients,
        price: state.bb.price,
        error: state.bb.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (type) => dispatch(actions.addIngredients(type)),
        onRemoveIngredients: (type) => dispatch(actions.removeIngredients(type)),
        onInitIngredients: () => dispatch(actions.initIngredients()), 
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))   
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));