import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


let ProtectedRoutesForUser=({ children })=>{
    const [flashMessage,setFlashMessage]=useState({success:"", error:""});

    const user= useSelector((state) => state.auth.user);
    const isAuthenticated = user && user.role==="user";
    
    const navigate= useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
 navigate("/login");

setFlashMessage({error:"Need to loggedin first to perform these tasks."});
setTimeout(()=>{setFlashMessage({error:""});},4000);
           
        }
    },[]);
    return (
        children
    )
}
export default ProtectedRoutesForUser;