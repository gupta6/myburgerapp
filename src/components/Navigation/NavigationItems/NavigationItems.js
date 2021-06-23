import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // let newButton = <NavigationItem link='/auth?path=/'>Authenticate</NavigationItem>
    let newButton = <NavigationItem link='/auth' closed={props.closed}>Authenticate</NavigationItem>
    if(props.isAuthenticated){
        newButton = <React.Fragment>
            <NavigationItem link='/orders' closed={props.closed}>Orders</NavigationItem>
            <NavigationItem link='/logout' closed={props.closed}>LogOut</NavigationItem>            
        </React.Fragment>
    }
    return <ul className={classes.NavigationItems}>
        <NavigationItem link='/' closed={props.closed}>Burger Builder</NavigationItem>        
        {newButton}
    </ul>
};


export default navigationItems;