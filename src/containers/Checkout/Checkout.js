import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect, withRouter} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component{
    
    cancelhandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.replace('/checkout/contactdata');       
    }

    render(){
        return(
            <React.Fragment>
                { this.props.ing ? (
                    <CheckoutSummary 
                    ingredients={this.props.ing} 
                    cancel={this.cancelhandler} 
                    continue={this.continueHandler}/>
                  ): <Redirect to='/'/> } 
                <Route path={this.props.match.url+'/contactdata'} 
                    component={ContactData}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.bb.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Checkout));