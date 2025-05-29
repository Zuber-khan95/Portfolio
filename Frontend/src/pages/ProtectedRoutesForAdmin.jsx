import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {setError} from '../Redux/flashSlice.js'



let ProtectedRoutesForAdmin=({ children })=>{
   

    const user= useSelector((state) => state.auth.user);
    const isAuthenticated = user && user.role==="admin";
    
    const navigate= useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!isAuthenticated){
            dispatch(setError("Only Admin can do perform these tasks.Need to log in as admin"));
setTimeout(()=>{dispatch(setError(''))},4000);
 navigate("/login");


           
        }
    },[]);
    return (
        children
    )
}
export default ProtectedRoutesForAdmin;