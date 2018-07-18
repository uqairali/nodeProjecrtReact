import React from 'react';
import { connect } from 'react-redux';
import { IoCompose } from 'react-icons/lib/io'
import * as createNotes from '../../../store/actions/createNotes';
const navBar=(props)=>{
    let onTimeOut=()=>{
        props.onTimeOut();
    }
   if(props.SaveData!==null){
       setTimeout(onTimeOut,3000);
   }
 
    return(
 <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{color:'#73D8FA'}} >
   <h5 style={{marginLeft:"60px"}} ><a style={{fontSize:'40px',fontWeight:'bold'}} ><IoCompose/></a>NoteWork</h5>
</nav>
<div style={{border:'1px inset #73D8FA'}}></div>
{
   props.SaveData!==null?
<div style={{textAlign:'center'}} className="alert alert-dismissible alert-success">
{props.SaveData}
</div>:null
}



</div>
    )
}
const mapStateToProps=state=>{
    return{
        SaveData:state.SaveData
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onTimeOut:()=>dispatch(createNotes.clearMessage())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(navBar);