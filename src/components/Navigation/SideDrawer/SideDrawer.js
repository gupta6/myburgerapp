import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const sideDrawer = props => {
    let attachedCSS = [classes.Sidedrawer, classes.Close];
    if(props.showSideD){
        attachedCSS = [classes.Sidedrawer, classes.Open];
    }
    
    return  <Aux>
        <Backdrop show={props.showSideD} closed={props.click}/>
        <div show={props.showSideD} className={attachedCSS.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} closed={props.click}/>
            </nav>
            
        </div>
    </Aux>
}

export default sideDrawer;