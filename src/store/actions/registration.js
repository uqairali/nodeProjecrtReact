import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as Server from '../../components/serverURL';

export const Registration=(data)=>{
return dispatch=>{
  axios.post(`${Server.server}/notes/register`,data).then(res=>{
    if(res.status===203){
      dispatch(registerFaild(res.data.msg));
       }
    if(res.status===201){
   dispatch(registerSuccess(res.data.msg));
    }
  } ).catch(err=>{
    dispatch(registerFaild(err.message));
  })
}
}

export const registerSuccess=(success)=>{
return{
  type:actionTypes.REGISTRATION_SUCCESS,
  regSuccess:success
}
}

export const registerFaild=(err)=>{
  return{
type:actionTypes.REGISTRATION_FAILD,
err:err
  }
}

export const msgDialogHide=()=>{
    return{
      type:actionTypes.MSG_DIALOG_TIMEOUT
    }
}