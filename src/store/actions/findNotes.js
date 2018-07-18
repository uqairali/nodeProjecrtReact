import * as actionType from './actionTypes';

export const findData=(data)=>{

 return dispatch=>{
   dispatch(findDataSuccess(data));
  }
}

export const findDataSuccess=(data)=>{
    return{
    type:actionType.FIND_DATA,
    data:data
    }
}
//delete from local variabel when user search and then click to delete button
export const delteFromLocalSearch=(data,id)=>{
    data=data.filter(item =>item._id !== id)
    return{
     type:actionType.DELETE_LOCAL_SEARCH,
     data:data
    }
} 

