import React from 'react';

const input=(props)=>{
    
    let inputElement=null;
    switch(props.elementType){      
        case('input'):
        
        inputElement=<input style={{backgroundColor:props.valid&&props.touched && props.validation?'rgb(202, 156, 156)' :props.backColor,color:props.color}}
        className="form-control form-control-sm" 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />; 
        break;

       case('textarea'):
        inputElement=<textarea 
        className="form-control form-control-sm"
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}> </textarea>
        break;
        default:
        inputElement=<input 
        className="form-control form-control-sm" 
        {...props.elementConfig} 
        value={props.value}/>;
    }

    return(
        <div className="form-group">
       <label className="col-form-label col-form-label-sm">{props.label}</label>
       {inputElement}        
        </div>
    )
}

export default input;