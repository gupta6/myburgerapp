import React, { Component, Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import {connect} from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSingup();
  }
  render() {
    let routes = (
      <Switch>
          <Route path='/' exact component={BurgerBuilder}/>            
          <Route path='/auth' render={() => ( 
              <Suspense fallback={<Spinner/>}> 
                <Auth/> 
              </Suspense>
            )}/>
          <Route component={BurgerBuilder}/>
        </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' render={() => (
              <Suspense fallback={<Spinner/>}> 
                <Checkout/> 
              </Suspense>
            )}/> 
          <Route path='/auth' render={() => ( 
              <Suspense fallback={<Spinner/>}> 
                <Auth/> 
              </Suspense>
            )}/>
          <Route path='/orders' render={() => (
              <Suspense fallback={<Spinner/>}>
                <Orders/> 
              </Suspense>
          )}/> 
          <Route path='/logout' component={Logout}/>
          <Route component={BurgerBuilder}/>
        </Switch>
      )
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSingup: () => dispatch(actions.checkAuthStatus())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
