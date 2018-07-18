import React from 'react';

const alert=(props)=>{
 
    return(
   
 <div className="alert alert-dismissible" style={{backgroundColor:'#F8D7DA'}} >
{props.message}
</div>
    )
}

export default alert;