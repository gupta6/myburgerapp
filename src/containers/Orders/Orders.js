import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from  '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component{
    
    goBack(){
        setTimeout(() => {
            this.props.history.goBack();
        }, 5000);
    }

    componentDidMount(){
       this.props.onGetOrders(this.props.token,this.props.userId);        
    }

    render(){
        return(
            <div>
                {this.props.orderData ? this.props.orderData.map(order => <Order 
                key = {order.id}
                ingredients={order.ingredients} 
                price={order.TotalPrice}/>): <Spinner/>}
                {this.props.error? this.goBack(): null}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        orderData: state.od.orders,
        error: state.od.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetOrders: (token,userId) => dispatch(actions.getOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));