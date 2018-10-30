import React from 'react';
import './sideBar.css';

const sideBar=(props)=>{
   
    
    return(
     <div className='SideDrawer'>
     {props.children}
     </div>
    
    );
}

export default sideBar;