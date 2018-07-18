import * as actionType from './actionTypes';
import axios from 'axios';
import * as Server from '../../components/serverURL';

//place old values in input fields 
export const editInputsField=(data,formType)=>{
    return{
     type:actionType.EDIT_INPUTS_DATA_ASIGN,
     data:data,
     formType:formType
    }
}

//update data on database
export const updateNotes=(data,id)=>{
    return dispatch=>{
  axios.put(`${Server.server}/notes/${id}`,data)
  .then(res=>{
    if(res.status===203){
    dispatch(onSaveDataFail("Non-Authoritative Information!!"));
    }
    if(res.status===400){
     dispatch(onSaveDataFail("Bad Request!!"));
    }
    if(res.status===201){
    dispatch(onSaveSuccess("Data updated success"))
    }
   
   })
  
   .catch(err=>{
  dispatch(onSaveDataFail(err.message));
   })
    }
}

//when fail updating data
export const onSaveDataFail=(err)=>{
return{
type:actionType.SAVE_DATA_FAILD,
error:err
}
}
//when update success
export const onSaveSuccess=(message)=>{
    return{
 type:actionType.SAVE_DATA_SUCCESS,
 message:message
}
}