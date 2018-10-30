import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';
import * as Icons from 'react-icons/lib/io';
import { registrationValidation,updateObject } from '../../Validation/inputValidation';
import Input from '../../UI/input/input';
import { connect } from 'react-redux';
import * as actionIndex from '../../../store/actions/index';
class Login extends Component{
    state={
        formInputs:{
           
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
           
        },
        formIsValid:false
    }


       

  onSubmit=()=>{
        const data={
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

      this.props.onLogIn(data);
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
       if(this.props.logInSuccess!==''||this.props.logInFaild!==''){
           setTimeout(onTimeOut,3000);
       }
     

     let successMsg=(
   <div className="alert alert-dismissible alert-success">
       <strong>{this.props.logInSuccess}</strong>
     </div>
    )
    let errorMsg=(
        <div className="alert alert-dismissible alert-danger">
            <strong>{this.props.logInFaild}</strong>
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

 
    <div className='container' >
  <div style={{color:'white'}} className="card border-secondary mb-3" style={{maxWidth:'700px'}}>
  <div style={{backgroundColor:'rgb(199, 141, 141)',color:'white'}} className="card-header">Login <a style={{fontSize:'35px',color:'rgb(13, 230, 193)',marginLeft:'20px'}} > <Icons.IoLogIn/></a></div>
  <div style={{backgroundColor:'rgb(71, 71, 71)',color:'white',borderRadius:'15px'}} className="card-body">
 {
     this.props.logInSuccess!==''?
successMsg
 :null
 }
 {
     this.props.logInFaild!==""?errorMsg:null
 }
 {
     this.props.token?<Redirect to='/NotesList'/>:null
 }
  {form}

<button onClick={this.onSubmit} className="btn btn-success btn-lg btn-block"><Icons.IoLogIn/> Login</button>
  </div>
</div>
        </div >
        </div>
        )
    }
}

const mapStateToPrope=state=>{
    return{
        logInSuccess:state.registerSuccess,
        logInFaild:state.error,
        token:state.token!==''
    }
}
const mapDispatchToProp=dispatch=>{
    return{
        onLogIn:(data)=>dispatch(actionIndex.Login(data)),
        onTimeOut:()=>dispatch(actionIndex.msgDialogHide()),
        error:(msg)=>dispatch(actionIndex.registerFaild(msg))

    }
}
export default connect(mapStateToPrope,mapDispatchToProp)(Login);