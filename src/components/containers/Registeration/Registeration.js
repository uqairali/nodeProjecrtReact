import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import './Registeration.css';
import * as Icons from 'react-icons/lib/fa';
import { registrationValidation,updateObject } from '../../Validation/inputValidation';
import Input from '../../UI/input/input';
import { connect } from 'react-redux';
import * as actionIndex from '../../../store/actions/index';
class Registration extends Component{
    state={
        formInputs:{
            name:{
                label:'User Name',
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
             },
             email:{
                label:'User Email',
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
             },
             password:{
                label:'User Password',
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                },
                value:'',
                validation:{
                    required:true,
                    minLingth: 6,
                    maxLingth: 15
                },
                valid:false,
                touched:false
             },
             confirmPassword:{
                label:'Confirm Password',
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                },
                value:'',
                validation:{
                    required:true,
                    minLingth: 6,
                    maxLingth: 15
                },
                valid:false,
                touched:false
             },
        },
        formIsValid:false
    }


       

  onSubmit=()=>{
        const data={
        name:this.state.formInputs.name.value,
        email:this.state.formInputs.email.value,
        password:this.state.formInputs.password.value
        }
        var valid=true;
        
        for(let key in this.state.formInputs){
            if(!this.state.formInputs[key].valid){
            if(valid){
           this.props.error(this.state.formInputs[key].label+" is require");
           valid=false
            }
            }
        }
      if(!valid) return;
      if(this.state.formInputs.password.value!==this.state.formInputs.confirmPassword.value){
          this.props.error("Password not Mathing!");
          return;
      }
      
           this.props.onRegister(data);
   
    }
    

    inputChangeHandler=(event,inputIdentifier)=>{
  
        const updatedFormElement= updateObject(this.state.formInputs[inputIdentifier],{
        value:event.target.value,
        valid:registrationValidation(event.target.value,this.state.formInputs[inputIdentifier].validation),    
    }); 
        const updatedOrderForm=updateObject(this.state.formInputs,{
        [inputIdentifier]:updatedFormElement
        });
        updatedFormElement.touched=true;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].value && formIsValid
        }
        this.setState({formInputs:updatedOrderForm,formIsValid:formIsValid});
      }

    render(){
 
        let onTimeOut=()=>{
           this.props.onTimeOut();
           
        }
       if(this.props.registerSuccess!==''||this.props.registerFaild!==''){
           setTimeout(onTimeOut,3000);
       }
     

     let successMsg=(
   <div className="alert alert-dismissible alert-success">
       <strong>{this.props.registerSuccess}</strong>
     </div>
    )
    let errorMsg=(
        <div className="alert alert-dismissible alert-danger">
            <strong>{this.props.registerFaild}</strong>
          </div>
         )

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
                    valid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    validation={formElement.config.validation}
                    shouldValidate={formElement.config.validation}
                    label={formElement.config.label}
                    changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                    backColor='rgb(104, 100, 100)'
                    color='white'
                    />
                ))}
             </form>);

        return(
 <div className='backColor'>
{
    this.props.registerSuccess!==""?<Redirect to='/'/>:null
}
 
    <div className='container' >
  <div style={{color:'white'}} className="card border-secondary mb-3" style={{maxWidth:'700px'}}>
  <div style={{backgroundColor:'rgb(116, 114, 114)',color:'white'}} className="card-header">Registration <a style={{fontSize:'25px',color:'rgb(82, 162, 231)'}} ><Icons.FaRegistered/></a></div>
  <div style={{backgroundColor:'rgb(71, 71, 71)',color:'white',borderRadius:'15px'}} className="card-body">
 {
     this.props.registerSuccess!==''?
successMsg
 :null
 }
 {
     this.props.registerFaild!==''?
errorMsg
 :null
 }
  {form}

<button onClick={this.onSubmit} className="btn btn-danger btn-lg btn-block"><Icons.FaUpload/> Submit</button>
  </div>
</div>
        </div >
        </div>
        )
    }
}

const mapStateToPrope=state=>{
    return{
        registerSuccess:state.registerSuccess,
        registerFaild:state.error,
       
    }
}
const mapDispatchToProp=dispatch=>{
    return{
        onRegister:(data)=>dispatch(actionIndex.Registration(data)),
        onTimeOut:()=>dispatch(actionIndex.msgDialogHide()),
        error:(msg)=>dispatch(actionIndex.registerFaild(msg))
    }
}
export default connect(mapStateToPrope,mapDispatchToProp)(Registration);