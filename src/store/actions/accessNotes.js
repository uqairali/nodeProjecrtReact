import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as createNotes from './createNotes';
import * as Server from '../../components/serverURL';
export const accessDataSuccess=(data)=>{
  
    return{
     type:actionTypes.ACCESS_DATA_SUCCESS,
     data:data
    }
}

export const onaccessDocCount=(docCount)=>{
   
    return{
     type:actionTypes.COUNT_DOCUMENT,
     docCount:docCount
    }
}
//access number of documents
export const accessDocCount=()=>{
    return dispatch=>{
        axios.get(`${Server.server}/notes/count`).then(res=>{
        console.log(res.status)
         var myDomument=+res.data;
         myDomument=myDomument/10;
          var parsDoc=Math.floor(myDomument);
          if(myDomument>parsDoc){
            parsDoc+=1
          }
          dispatch(onaccessDocCount(parsDoc));
          
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
//get requist to access data to server
export const accessNotes=(indexNum,skip,visited,visitArray,data)=>{

    return dispatch=>{
    if(!visited){
    axios.get(`${Server.server}/notes/${skip}`)
    .then(res=>{
    console.log(res.status)
    if(res.status===404){
    dispatch(createNotes.onSaveSuccess("Not Found!!"))
    }
  
     dispatch(accessDataSuccess(res.data))

    })
    .catch(err=>{
    console.log(err.message)
    })
}else{
 dispatch(SearchLocal(data,visitArray,indexNum))
}
    }
}

//access local state 
export const SearchLocal=(data,visitArray,indexNum)=>{
//loginc for skping data 
 var skipIndex=0;
 for(var j=0;j<=visitArray.length-1;j++){
    skipIndex+=1
     if(visitArray[j]===indexNum){
      j=visitArray.length-1;
     }
 }
 skipIndex=skipIndex-1;
 skipIndex=skipIndex*10
var newData=[];

for(var i=skipIndex;i<=data.length-1;i++){
  if(newData.length<10){
      newData=newData.concat(data[i])
  }
}

return{
    type:actionTypes.UPDATE_DATA_STATE,
    data:newData,
    allData:data
   }
}