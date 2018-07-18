import React,{Component} from 'react';
import './CreateNotes.css';
import { connect } from 'react-redux';
import * as Icon from 'react-icons/lib/fa'
import { Redirect } from 'react-router-dom';
import Input from '../../../components/UI/input/input';
import { updateObject,checkValidity,error } from '../../Validation/inputValidation';
import Alert from '../../UI/alert/alert';
import Navbar from '../../UI/navBar/navBar';
import * as actionsIndex from '../../../store/actions/index';
class CreateNotes extends Component{

    componentDidMount(){
        this.props.onClearData();
    }
 
    state={
        formInputs:{
            title:{
                label:'Title',
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                },
                value:this.props.title,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
             },
             content:{
                label:'Content',
                elementType: 'textarea',
                elementConfig:{
                    type: 'text',
                },
                value:this.props.content,
                validation:{
                    required:true
                },
                valid:false,
                touched:false
             },
             tags:{
                label:'Tags',
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                },
                value:this.props.tags,
                validation:{
                    required:false
                },
                valid:true,
                touched:false
             },
        },
        onsubmit:false,
        closeComponent:false
    }
switchToNotesList=()=>{
    this.setState({closeComponent:true})
}


dateFormate=(date)=>{
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

onSave=()=>{
this.setState({onsubmit:true})
  const formData={
    title:this.state.formInputs.title.value,
    content:this.state.formInputs.content.value,
    tags:this.state.formInputs.tags.value,
    createDate:this.dateFormate(new Date)

  }
if(error.Title===null&&error.Content===null){
  if(this.props.formType==="Save"){  
  this.props.onSubmit(formData);
  }

}

  if(this.props.formType==="Edit"){
  this.props.onUpdateData(formData,this.props.id)
  }
}


    inputChangeHandler=(event,inputIdentifier)=>{
  
        const updatedFormElement= updateObject(this.state.formInputs[inputIdentifier],{
        value:event.target.value,
        valid:checkValidity(event.target.value,this.state.formInputs[inputIdentifier].validation,this.state.formInputs[inputIdentifier].label),
        }); 
        const updatedOrderForm=updateObject(this.state.formInputs,{
        [inputIdentifier]:updatedFormElement
        });
        updatedFormElement.touched=true;
      
     
      
        this.setState({formInputs:updatedOrderForm});
      }

     
    render(){
        const formElementsArray=[];
    for(let key in this.state.formInputs){
            formElementsArray.push({
            id:key,
            config:this.state.formInputs[key]
            
        });
    }

let form=(
<form >
    {formElementsArray.map(formElement=>( 
       <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        label={formElement.config.label}
        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
        />
    ))}
 </form>);
  
  return(
      <div>
      <Navbar/>
    <div className="container">
    <div className="card bg-light mb-3" style={{maxWidth:"700px",borderWidth:'1.5px'}}>
    <div style={{backgroundColor:"white"}} className="card-body">
    <h6><a style={{fontSize:'20px'}} ><Icon.FaFileText/></a>New Note<a onClick={this.switchToNotesList} style={{float:'right',color:'red',cursor:'pointer',fontSize:'20px'}} ><Icon.FaClose/></a></h6>
  {
     this.state.onsubmit && error.Title!==null?
     <Alert message={error.Title} /> :null
  }
  {
     this.state.onsubmit && error.Content!==null?
     <Alert message={error.Content} /> :null
  }
  {
      this.props.serverError!==null?
      <Alert message={this.props.serverError}/>:null
  }
 
  
   {form}
<div className="Buttons">
<button onClick={this.switchToNotesList} type="button" className="btn btn-danger"><Icon.FaClose/> Cancel</button>
</div>
<div className="Buttons">
<button onClick={this.onSave} type="button" className="btn btn-success"><Icon.FaFloppyO/> {this.props.formType}</button>
</div>
 </div>
</div>
{
    this.state.closeComponent||
    this.props.formType===null||
     this.props.SaveData!==null?
    <Redirect to='/'/>
    :null
}
            </div>
            </div>
        )
    }
}

const mapStateToprops=state=>{
    return{
        serverError:state.saveDataError,
        title:state.title,
        content:state.content,
        tags:state.tags,
        id:state.id,
        formType:state.formType,
        SaveData:state.SaveData
    }
}

const mapDispatchToProps=dispatch=>{
    return{
      onSubmit:(data)=>dispatch(actionsIndex.onSaveData(data)),
      onUpdateData:(data,id)=>dispatch(actionsIndex.updateNotes(data,id)),
      onClearData:()=>dispatch(actionsIndex.clearData())
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(CreateNotes);