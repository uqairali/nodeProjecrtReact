import * as actionType from '../actions/actionTypes';
import { stat } from 'fs';

const initialState={
  saveDataError:null,
  allNotes:[],
  concatNotes:[],
  title:'',
  content:'',
  tags:'',
  id:'',
  formType:null,
  SaveData:null,//when data succss then assign success message else null
  documentCount:null,
  findData:[],
  spinner:true,
  error:'',
  registerSuccess:'',
  token:'',
  userId:'',
  allDocuments:[],
  
}
const reducer=(state=initialState,action)=>{
switch(action.type){
  //create notes cases
  case actionType.SAVE_DATA_FAILD:
  return{
      ...state,
      saveDataError:action.error,
  }
  case actionType.CLEAR_INPU_FIELD:
  return{
    ...state,
    title:'',
    content:'',
    tags:'',
    id:'',
    formType:action.formType
  }
  case actionType.SAVE_DATA_SUCCESS:
  return{
    ...state,
    SaveData:action.message
    
  }

  case actionType.CLEAR_SUCCESS_MESSAGE:
  
  return{
    ...state,
    SaveData:null
  }
  //access or notes list cases
  case actionType.ACCESS_DATA_SUCCESS:
  return{
    ...state,
    allNotes:action.data,
    concatNotes: state.concatNotes.concat(action.data),
    spinner:false
  }
  //update old state
  case actionType.UPDATE_DATA_STATE:
  return{
    ...state,
    allNotes:action.data,
    concatNotes:action.allData
  }

  case actionType.CLEAR_DATA_STATE:
  return{
    ...state,
    concatNotes:[],
    saveDataError:null
  }
//access count all documnets
case actionType.COUNT_DOCUMENT:
return{
   ...state,
   documentCount:action.docCount
}
  //edit data sase
  case actionType.EDIT_INPUTS_DATA_ASIGN:
  return{
    ...state,
    title:action.data.title,
    content:action.data.content,
    tags:action.data.tags,
    id:action.data.id,
    formType:action.formType,
       
  }
  case actionType.FIND_DATA:
  return{
   ...state,
   findData:action.data
  }
  case actionType.DELETE_LOCAL_SEARCH:
  return{
    ...state,
    findData:action.data
  }
  //registration case

  case actionType.REGISTRATION_SUCCESS:
  return{
    ...state,
    registerSuccess:action.regSuccess,
    error:'',
  }

  case actionType.REGISTRATION_FAILD:
  return{
    ...state,
    error:action.err,
    registerSuccess:''
  }

  case actionType.MSG_DIALOG_TIMEOUT:
  return{
    ...state,
    error:'',
    registerSuccess:''
  }

  //login case
   case actionType.LOGIN_SUCCESS:
   return{
     ...state,
     token:action.token,
     registerSuccess:action.msg,
     userId:localStorage.getItem('userId')
   }
   case actionType.LOG_OUT:
   return{
     ...state,
     token:''
   }

   case actionType.CHECK_LOGIN:
   return{
     ...state,
     token:action.token,
     userId:localStorage.getItem('userId')
   }

   case actionType.GET_DOCUMENTS_SUCCESS:
   return{
     ...state,
     allDocuments:action.data,
     spinner:false
   }

   case actionType.UPDATED_LIKES_SUCCESS:
   console.log(action.data)
   return{
    ...state,
     allDocuments:action.data,
   }
    default:
    return state;
}
}

export default reducer;