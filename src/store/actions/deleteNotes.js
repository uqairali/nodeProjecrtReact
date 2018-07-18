import * as actionType from './actionTypes';
import axios from 'axios';
import * as accessNotes from './accessNotes';
import * as findNotes from './findNotes';
import * as Server from '../../components/serverURL';

export const deleteNotes=(id,data,indexAarray,indexNum,findData)=>{
     
   var deleteNode=data.filter(item =>item._id !== id)
    return dispatch=>{
      
    axios.delete(`${Server.server}/notes/${id}`).then(res=>{
     if(res.status===202){
    dispatch(onDataSuccess("Your data is deleted successfuly"));
    dispatch(accessNotes.SearchLocal(deleteNode,indexAarray,indexNum));
     if(findData.length>0){
         dispatch(findNotes.delteFromLocalSearch(findData,id))
     }
     }
     if(res.status===400){
        dispatch(onDataSuccess("Bad Request!!"));
     }
    }).catch(err=>{
    console.log(err.Message)
    })
    
    }
}

//when delete success
export const onDataSuccess=(message)=>{
  
    return{
 type:actionType.SAVE_DATA_SUCCESS,
 message:message
}
}