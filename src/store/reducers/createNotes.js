import * as actionType from '../actions/actionTypes';

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
  findData:[]
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
    concatNotes: state.concatNotes.concat(action.data)
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
    default:
    return state;
}
}

export default reducer;