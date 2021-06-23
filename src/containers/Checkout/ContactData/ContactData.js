import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{    

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for( let key in this.props.form){
            formData[key] = this.props.form[key].value;
        }        
     
        const orders = {
            ingredients: this.props.ings,
            TotalPrice: this.props.Price,
            orderData: formData,
            userId: this.props.userId
        }
        
        this.props.onpurhase(orders,this.props.token)
    }

    render(){

        let form = (
            <div className={classes.contactdata}>
                <h3>Enter your Contact Details:</h3>
                <form onSubmit={this.orderHandler}>
                    {Object.values(this.props.form).map((input,index) => {
                        return <Input key={Object.keys(this.props.form)[index]}
                        inputtype={input.elementType} 
                        config={input.elementConfig}
                        value={input.value} 
                        touched = {input.touched}
                        invalid = {input.validation ? !input.validation.valid: null}
                        change={(event)=>this.props.oninputChange(event,Object.keys(this.props.form)[index])}/>
                    })}
                    <Button btnType='Success' disabled={!this.props.formValidity} >Order</Button>
                </form>
            </div>
        );

        if(this.props.loading){
            form = <Spinner/>
        }
        
        if(this.props.orderHandled){
            form = <Redirect to='/' />
        } 
        return form; 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.bb.ingredients,
        Price: state.bb.price,
        form: state.cd.orderForm,
        formValidity: state.cd.formisValid,
        loading: state.cd.loading,
        orderHandled: state.cd.orderHandled,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        oninputChange: (event, inputName) => dispatch(actions.inputChange(event.target.value, inputName)),
        onpurhase: (orderData,token) => dispatch(actions.burgerPurchase(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData));