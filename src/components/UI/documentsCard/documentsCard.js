import React from 'react';
import * as Icons from 'react-icons/lib/fa';
const docCard=(props)=>{
    return(
        <div className="card bg-light mb-3" style={{maxWidth:'600px'}}>
  <div style={{fontWeight:'bold'}} className="card-header">{props.title}</div>
  <div className="card-body">
    <p className="card-text">{props.body}</p>
    <div style={{float:'right'}} ><a onClick={props.onLicked.bind(this,props.id,props.likes)} style={{fontSize:'25px',color:'rgb(6, 190, 144)',marginRight:'10px'}}><Icons.FaThumbsOUp/></a><span style={{fontSize:'12px',marginLeft:'10px'}} className="badge badge-primary badge-pill">{props.likes}</span></div>
  </div>
</div>
    )
}

export default docCard;