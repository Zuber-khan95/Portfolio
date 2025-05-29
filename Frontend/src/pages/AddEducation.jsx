import {useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
axios.defaults.withCredentials=true;
import './AddEducation.css'
import {useSelector,useDispatch} from "react-redux";
import {handleAxiosError}  from '../../handleAxiorError';
import {setSuccess,setError} from '../Redux/flashSlice.js'
import {useForm} from 'react-hook-form'


export default function AddEducation()
{
  const user=useSelector((state)=>state.auth.user);
  const { success,error }=useSelector((state)=>state.flashMessages);
  const dispatch=useDispatch();
  
const {register,handleSubmit,reset}=useForm({
  defaultValues:{
    graduation:"",
    specialization:"",
    startingYear:"",
    endingYear:""
  }
})

  const navigate=useNavigate();
useEffect(()=>{
  if(success || error)
  {
    setTimeout(()=>{
 dispatch(setSuccess(''));
  dispatch(setError(''));
    },4000);
  }
},[success,error]);

    let onSubmit=async(FormData)=>{
      try{
const response=await axios.post(`http://localhost:8080/education/new/${user.userId}`,FormData);
    if(response.data.state=="success")
     {
            dispatch(setSuccess("Successfully Added Education"));
            reset();
            setTimeout(()=>{navigate("/");},4000);
      }
       }
    catch(err){
      const errorMsg=handleAxiosError(err);
      if(errorMsg.status===500){
 dispatch(setError("Server Error or Graduation already existed"));
      }
          if(errorMsg.status===403){
 dispatch(setError("Only Admin are allow to do this"));
      }
      if(errorMsg.status===404)
      {
 dispatch(setError("User not found so unable to add education"));
      }
      if(errorMsg==="Network Error")
             {
 dispatch(setError("Network Error, No response from server"));
      }
     if(errorMsg==="Unexpected error occured")
      {
 dispatch(setError('Need to logged in first as Admin to do this'));
      }

      }
       };
    
  return (
    <div className="Form">
  {success && <div className="alert alert-success">{success}</div>}
  {error && <div className="alert alert-danger">{error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Add Education from here..</h3>
  <div className="AddEducation">
   
    <form onSubmit={handleSubmit(onSubmit)}>

        <TextField label="Graduation"
        {...register("graduation")}
         variant="filled"
          color="success" 
          type="text"
          focused
          required />
          <br /><br />
          <TextField label="Specialization"
           {...register("specialization")}
         variant="filled"
          color="success" 
          type="text"
          focused
          required />
          <br /><br />
          <TextField label="Starting Year"
           {...register("startingYear")}
         variant="filled"
         color="success"
         type="text" 
          focused 
          required/>
          <br /><br />
          <TextField label="Ending Year"
           {...register("endingYear")}
         variant="filled"
         color="success"
         type="text" 
          focused 
          required/>
          <br /><br />
          <Button variant="contained" color="success" type="submit">Add Education</Button>
      </form>
      </div>
      </div>
  )
}