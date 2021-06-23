import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utility';


function inputDecalare (){
    return {
            elementType: arguments[0],
            elementConfig: {
                type: arguments[1],
                placeholder: arguments[2]
            },
            value: '',
            validation: {
                required: true,
                valid: false,
                lengthCheck: arguments[3] ? (typeof(arguments[4])==='object' ? {minLength: arguments[4][0], maxLength: arguments[4][1]} : {length: arguments[4]}) : null,
                regexCheck: arguments[5] ? {
                    regex: arguments[6]
                } :null
            },
            touched : false,
        }           
} 


class Auth extends Component{
    state = {
        controls: {
            email: inputDecalare('input','email','Your Mail',false,'',true,"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]+$"),
            password: inputDecalare('input','password','Password',true,[6,15],true,"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
        },
        formisValid: false,
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectAuthPath();
        }
    }

    inputChangeHandler = (event,inputName) => {
        let formisValid = true;
        const reqInput = {...this.state.controls[inputName]};        
        reqInput.value = event.target.value;
        if(reqInput.validation){
            reqInput.validation.valid = checkValidity(reqInput.value,reqInput.validation);
        } 
        
        reqInput.touched = true;
        const controls = {...this.state.controls};
        
        controls[inputName] = reqInput;
        for(let field in controls){
            if(controls[field].validation){
                formisValid = formisValid && controls[field].validation.valid;
            }
        }
        this.setState({
            ...this.state,
            controls: controls,
            formisValid: formisValid
        });
    }

    formHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    authMethodHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){
        const controls = [];
        for(let input in this.state.controls){
            let obj1 = {id:input, setting: this.state.controls[input]};
            controls.push(obj1);
        }
        
        const form = this.props.loading ? <Spinner/> : controls.map(input => {
            return <Input key={input.id}  
            inputtype={input.setting.elementType} 
            config={input.setting.elementConfig}
            value={input.setting.value} 
            touched = {input.setting.touched}
            invalid = {input.setting.validation ? !input.setting.validation.valid: null} 
            change={(event)=>this.inputChangeHandler(event,input.id)}/>   
        });

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }

        let auth = this.props.isAuth ? <Redirect to={this.props.authRedirectPath} />: <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={this.formHandler}>
                {form}
                <Button btnType='Success' disabled={!this.state.formisValid} >SUBMIT</Button>
            </form>
            <Button btnType='Danger' clicked={this.authMethodHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
        </div>        

        return auth;
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        burgerBuilding: state.bb.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,signup) => dispatch(actions.auth(email,password,signup)),
        onSetRedirectAuthPath : () => dispatch('/')
    }
}

export default connect(mapStateToProps,mapDispatchToProps)((Auth));