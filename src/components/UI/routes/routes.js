import React from 'react';
import './routes.css';
import { NavLink } from 'react-router-dom';
const routes=(props)=>{
    return(
        <li onClick={props.onClick} className ="NavigationItem">
        <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName="active">
        {props.children}
        </NavLink>
                </li>
               
    )
}

export default routes;