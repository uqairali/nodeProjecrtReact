import axios from 'axios';
import * as actionType from './actionTypes';
import * as Server from '../../components/serverURL';

export const onSaveDataFail=(error)=>{
    return{
        type:actionType.SAVE_DATA_FAILD,
        error:error
    }
}
export const onSaveData=(data)=>{
  
 return dispatch=>{
   axios.post(`${Server.server}/notes`,data)
   .then(res=>{
       dispatch(onSaveDataFail(null))
    if(res.status===203){
    dispatch(onSaveDataFail("Non-Authoritative Information"));
    }
    if(res.status===400){
        dispatch(onSaveDataFail("Bad Request"));
    }
    if(res.status===201){
        dispatch(onSaveSuccess("Data has been successfuly saved."));
    }
   })
  
   .catch(err=>{
  dispatch(onSaveDataFail(err.message));
   })
  
 }
}

export const clearAllInputs=(formType)=>{
    return{
        type:actionType.CLEAR_INPU_FIELD,
        formType:formType
    }
}
//clear success message variable
export const clearMessage=()=>{
 
   return{
       type:actionType.CLEAR_SUCCESS_MESSAGE
   }
  
}
//when saved success
export const onSaveSuccess=(message)=>{
  
    return{
 type:actionType.SAVE_DATA_SUCCESS,
 message:message
}
}

export const clearData=()=>{
 return{
     type:actionType.CLEAR_DATA_STATE
 }
}