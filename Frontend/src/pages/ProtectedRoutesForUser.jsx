import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {setError} from '../Redux/flashSlice.js'


let ProtectedRoutesForUser=({ children })=>{
    const [flashMessage,setFlashMessage]=useState({success:"", error:""});

    const user= useSelector((state) => state.auth.user);
    const isAuthenticated = user && user.role==="user";
    
    const navigate= useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!isAuthenticated){
 navigate("/login");

dispatch(setError("Only loggedin user can perform these tasks, Admin can not."));
setTimeout(()=>{dispatch(setError(""));},4000);
           
        }
    },[]);
    return (
        children
    )
}
export default ProtectedRoutesForUser;