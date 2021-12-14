import axios from 'axios';
import {loginFailure, loginStart, loginSuccess,registerStart,registerSuccess,registerFailure} from './userRedux'

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post(`https://ecommercewebbackend.herokuapp.com/api/userLogin`,user);
        dispatch(loginSuccess(res.data))

    }catch(err){
        dispatch(loginFailure())
    }
}

export const register =async (dispatch,user)=>{
    dispatch(registerStart());
    try{
        const res = await axios.post(`https://ecommercewebbackend.herokuapp.com/api/registerCustomer`,user);
        dispatch(registerSuccess(res.data))

    }catch(err){
        dispatch(registerFailure())
    }
}