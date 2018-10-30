import React from 'react';
import { connect } from 'react-redux';
import * as Icons from 'react-icons/lib/io'
import * as createNotes from '../../../store/actions/createNotes';
import * as actionsInex from '../../../store/actions/index';
import Routes from '../routes/routes';
import './naveBar.css';
const navBar=(props)=>{
    let onTimeOut=()=>{
        props.onTimeOut();
    }
   if(props.SaveData!==null){
       setTimeout(onTimeOut,3000);
   }
 
    return(
 <div>
<div className="Toolbar" >
   <h5 style={{marginLeft:"60px"}} ><a style={{fontSize:'40px',fontWeight:'bold',color:'white'}} ><Icons.IoCompose/></a>NoteWork</h5>

<ul className="NavigationItems">
{
props.token?null :<Routes link="/" exact>Login</Routes>
}
{
props.token?null:<Routes link="/registration" exact>Restration </Routes>
}
{
  props.token?<Routes onClick={props.onLogout} link="/" exact>LogOut </Routes>:null
}

{
    props.token?<Routes link="/NotesList" exact>NotesList </Routes>:null
  }

 <Routes link="/document" exact>Documents </Routes>
    </ul>
</div>

<div style={{border:'1px inset #73D8FA',marginTop:'56px'}}></div>
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
        SaveData:state.SaveData,
        token:state.token!==''
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onTimeOut:()=>dispatch(createNotes.clearMessage()),
        onLogout:()=>dispatch(actionsInex.logOut())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(navBar);