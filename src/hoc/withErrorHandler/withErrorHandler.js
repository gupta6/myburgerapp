import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';
import axios from 'axios';

const withErrorHandler = (WrappedComponent) => {
    
    
    return class extends Component {
        state = {
            error: null
        }

        constructor(props){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,error=> {
                this.setState({error: error})
            });
            
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        
        render(){
            return (
                <Aux>
                    <WrappedComponent  {...this.props}/>
                    <Modal modalclosed={this.errorConfirmedHandler} show={this.state.error}>{this.state.error ? this.state.error.message : null}</Modal>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;