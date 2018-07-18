import React from 'react';

const singleNode =(props)=>{

    return(
        <li onClick={props.onNodeClick.bind(this,props.id)} className="page-item">
        {
           props.value===props.selectColor?
        <a style={{backgroundColor:'#73D8FA'}} className="page-link">{props.value}</a>
       : <a className="page-link">{props.value}</a>

          } 
           </li>
    )
}
export default singleNode;