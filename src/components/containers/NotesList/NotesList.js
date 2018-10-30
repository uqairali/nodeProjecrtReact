import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from '../../UI/form/from';
import './NotesList.css';
import SearchInput from '../../UI/SearchInputField/SearchInputField';
import { error } from '../../Validation/inputValidation';
import Modal from '../../UI/modal/modal';
import * as Icons from 'react-icons/lib/io';
import PaginationBar from '../../UI/pagination/pagination';
import * as actionsIndex from '../../../store/actions/index';
import Spinner from '../../UI/Spiner/Spiner';
class NotesList extends Component{

componentWillMount(){

  this.props.onAccessCountDocument();
  this.props.onAccessNotes(0);//access data from db with 0 number of data skip
  this.props.onFindData([])//clear finding data array
}

 
 state={
    redirect:false,
    showModal:false,
    id:null,
    searchValue:'',
    selectPaginationNode:1,
    skipData:0,
    visitingNod:[1]
}
 
onUpdatePaginationNode=(value)=>{
  this.props.onFindData([]);
  var visited=false;
  for(var i=0;i<=this.state.visitingNod.length-1;i++){
  if(this.state.visitingNod[i]===value){
  visited=true
   }
  }
  if(!visited){
  this.setState({visitingNod:this.state.visitingNod.concat(value)})
  }
  
  const skipData=(value-1)*10;
  this.props.onAccessNotes(value,skipData,visited,this.state.visitingNod,this.props.concatNotes);
  this.setState({selectPaginationNode:value,skipData:skipData,searchValue:'',findData:[]});
}

onhandleSearchInputChange=(event)=>{
  this.setState({searchValue:event.target.value})
  if(event.target.value===""){ 
  this.props.onFindData([]);
  }

}


onSearchButtonClick=()=>{
   if(this.state.searchValue!==""){
   var arr=[];
   for(var i=0;i<=this.props.concatNotes.length-1;i++){
   
     if(this.state.searchValue===this.props.concatNotes[i].title){
     arr=arr.concat(this.props.concatNotes[i]);
  }   
  }
  this.props.onFindData(arr)
}
}

    onModalCancelButton=()=>{
    this.setState({showModal:false})
    
  }
    onModalContinueButton=()=>{
    this.setState({showModal:false})
    this.props.onDeleteNotes(this.state.id,this.props.concatNotes,this.state.visitingNod,this.state.selectPaginationNode,this.props.findData);
  }

   SwithToNewCreateNotes=()=>{
    error.Title="Title is required";
    error.Content="Content is required";
    this.props.onClearInputFields("Save");
    this.setState({redirect:true})
   }
     SwithToEditCreateNotes=(data)=>{
     error.Title=null
     error.Content=null
     this.props.onEditInputData(data,"Edit");
     this.setState({redirect:true})
  }
  
  
  //click on delete button
  onDeleteNotes=(id)=>{
  this.setState({showModal:true,id:id})
  }

    render(){
    return(
    <div>

      {
     this.props.token?null:<Redirect to='/'/>
 }
 <div className="container">
 <SearchInput 
               SwithToCreateNotes={this.SwithToNewCreateNotes}
               Searchvalue={this.state.searchValue}
               handleSearchInputChange={this.onhandleSearchInputChange}
               searchButtonClick={this.onSearchButtonClick} 
                />
 

 <table  className="table table-striped table-bordered">
        <thead>
          <tr >
          <th></th>
            <th>Title</th>
            <th> Content</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
         
         { this.props.findData.length>0?
           this.props.findData.map(data=>(
          <Form  key={data._id}
                id={data._id}
                 title={data.title}
                 content={data.content}
                 date={data.createDate}
                 tags={data.tags}
                 onEditClick={this.SwithToEditCreateNotes}
                 onDeleteClick={this.onDeleteNotes}
                 />

                )):
                
                this.props.NotesData.map(data=>(
                 
                  
                  <Form  key={data._id}
                        id={data._id}
                         title={data.title}
                         content={data.content}
                         date={data.createDate}
                         tags={data.tags}
                         onEditClick={this.SwithToEditCreateNotes}
                         onDeleteClick={this.onDeleteNotes}
                         user={data.userId===localStorage.getItem('userId')}
                         />
                        
                        )
                       
                        ) 
                      
         }
         
        </tbody>
      </table>

     { 
     this.props.spinner?<Spinner/>:null
    }
  <PaginationBar
        selectPaginationNode={this.state.selectPaginationNode}
        updatePaginationNode={this.onUpdatePaginationNode}
  />

{this.state.showModal ?//if clic on delte button
    <Modal title='Are you sure you want to delete!' >
    <button style={{float:'left'}} onClick={this.onModalCancelButton} className="btn btn-danger"><Icons.IoAndroidCancel/> Cancel</button>
    <button style={{float:'right'}} onClick={this.onModalContinueButton} className="btn btn-success"><Icons.IoCheckmark/> Continue</button>
    </Modal>  :null
}

{this.state.redirect?<Redirect to="/create-notes"/>:null}

</div>

    </div>

          
        )
    }
}

const mapStateToProps=state=>{
  return{
    NotesData:state.allNotes,
    concatNotes:state.concatNotes,
    findData:state.findData,
    spinner:state.spinner,
    token:state.token!==''
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onAccessNotes:(indexNum,skip,visitedTF,visitedArry,data)=>dispatch(actionsIndex.accessNotes(indexNum,skip,visitedTF,visitedArry,data)),
    onEditInputData:(data,formType)=>dispatch(actionsIndex.editInputsField(data,formType)),
    onClearInputFields:(formType)=>dispatch(actionsIndex.clearAllInputs(formType)),
    onDeleteNotes:(id,stateData,indexAarray,indexNum,findData)=>dispatch(actionsIndex.deleteNotes(id,stateData,indexAarray,indexNum,findData)),
    onAccessCountDocument:()=>dispatch(actionsIndex.accessDocCount()),
    onFindData:(data)=>dispatch(actionsIndex.findData(data)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(NotesList);