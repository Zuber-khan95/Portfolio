import {useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import './Login.css'
import { handleAxiosError } from '../../handleAxiorError';
import {loginSuccess} from "../Redux/authSlice"
import {setSuccess,setError} from '../Redux/flashSlice';
import { useSelector , useDispatch } from 'react-redux';

export default function LogIn()
{

 let {register,handleSubmit}=useForm({defaultValues:{
  email:"",
  password:""
 }});
  const { success, error } = useSelector((state) => state.flashMessages);
    const dispatch = useDispatch();

  
    useEffect(() => {
    if (success || error) {
  setTimeout(()=>{
dispatch(setSuccess(''));
dispatch(setError(''));
  },4000);
    }}, [success,error]);

    const navigate=useNavigate();
 

    let onSubmit=async(formData)=>{
   
      try{
        const response=await axios.post("http://localhost:8080/login",formData);
        const token=response.data.jsonToken;
        if(response.data.state==="success" && token)
        {
           dispatch(loginSuccess(token));
          dispatch(setSuccess("Successfully logged in"));
          setTimeout(()=>navigate('/'),4000);
        }
        } 
      catch(err)
      {
        const errorMsg=handleAxiosError(err);
            if(errorMsg.status===400){
 dispatch(setError("Email and password is required"));
      }
      if(errorMsg.status===401){
 dispatch(setError("Username or password is incorrect"));
      }
        if(errorMsg.status===404){
 dispatch(setError("Some error unable to get token"));
      }
     if(errorMsg.status===500){
 dispatch(setError("Server Error"));
      }
     if(errorMsg==='Network Error'){
 dispatch(setError("Network Error, No response from Server"));
      }
      if(errorMsg==="Unexpected error occured"){
        dispatch(setError('Some Unexpected Error'));
      }
       
      }
    };

  return (
    <div className="Form">
  {success && <div className="alert alert-success">{success}</div>}
  {error && <div className="alert alert-danger">{error}</div>}
       <h3 style={{textAlign:"centre",color:"green"}}>Login Form</h3>
  <div className="login">
   
    <form onSubmit={handleSubmit(onSubmit)}>
       <TextField label="Email"
        {...register("email")}
         variant="filled"
          color="success" 
          type="email"
          name="email"
          focused
         />
          <br /><br />
          <TextField label="password"
          {...register("password")}
         variant="filled"
         color="success"
         type="password" 
         name="password"
          focused 
          />
          <br /><br />
          <Button variant="contained" color="success" type="submit">Login</Button>
      </form>
      </div>
      </div>
  )
}

