import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationitem = props => {
   
    return (
    <li className={classes.NavigationItem}>
        <NavLink onClick={props.closed} to={props.link} exact activeClassName={classes.active}  >{props.children}</NavLink>
    </li>
)};

export default navigationitem;