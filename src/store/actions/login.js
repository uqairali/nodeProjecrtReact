import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as Server from '../../components/serverURL';

export const Login=(data)=>{
    return dispatch=>{
    axios.post(`${Server.server}/notes/login`,data).then(res=>{
        if(res.status===201){
            localStorage.setItem("token",res.data.token);
            localStorage.setItem('userId',res.data.data[0]._id)
            dispatch(logInSuccess(res.data))
        }else{
            dispatch(logInFaild(res.data.msg))
        }
    }).catch(err=>{
        dispatch(logInFaild(err.message))
    })
    }
}

export const logInSuccess=(data)=>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
        token:data.token,
        msg:"success",
    }
}

export const logInFaild=(msg)=>{
    return{
        type:actionTypes.REGISTRATION_FAILD,
        err:msg
    }
}

export const logOut=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return{
        type:actionTypes.LOG_OUT
    }
}

export const checkLogin=(token)=>{
    return{
    type:actionTypes.CHECK_LOGIN,
    token:token
    }
}