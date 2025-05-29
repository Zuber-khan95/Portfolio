import {useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {setSuccess,setError} from '../Redux/flashSlice.js'
import { handleAxiosError } from '../../handleAxiorError';
import {useForm} from "react-hook-form"

function Contact()
{
  const {register,handleSubmit,reset}=useForm({
    defaultValues:{
    name:"",
    organisation:"",
    mobileNo:"",
    message:""
    }
  });

    const user=useSelector((state)=>state.auth.user);
    const {success,error}=useSelector((state)=>state.flashMessages);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    useEffect(()=>{
   if(success ||error) 
    {
   setTimeout(()=>{
   dispatch(setSuccess(''));
   dispatch(setError(''));
  },4000);
  }
  },[success,error]);

    let onSubmit=async(FormData)=>{
      try{
      await axios.post(`http://localhost:8080/contact/new/${user.userId}`,FormData);
      dispatch(setSuccess("Successfully Send your data to Admin"));
      setTimeout(()=>{navigate('/')},4000);
     reset();
     }

      catch(err)
      {
        const errorMsg=handleAxiosError(err);
        if(errorMsg.status===403)
        {
         dispatch(setError( "You are not our user please logged in or signup first to do this."));
        }
         if(errorMsg.status===404)
        {
         dispatch(setError("User not found, so you can't do this."));
        }
        if(errorMsg.status===500)
        {
         dispatch(setError("Server Error"));
        }
         if(errorMsg==='Network Error')
        {
         dispatch(setError("Network Error , No response from server."));
        }
         if(errorMsg==="Unexpected error occured")
        {
         dispatch(setError('Some unexpected Error'));
        }
      }
    };

  return (
    <div className="Form">
  {success && <div className="alert alert-success">{success}</div>}
  {error && <div className="alert alert-danger">{error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Contact Us</h3>
  <div className="ContactForm">
   
    <form onSubmit={handleSubmit(onSubmit)}>

        <TextField label=" Your Name"
        {...register("name")}
         variant="filled"
         color="success" 
         type="text"
         focused
         required />
         <br /><br />
         <TextField label="Organisation Name"
         {...register("organisation")}
         variant="filled"
         color="success" 
         type="text"
         focused
         required />
         <br /><br />
         <TextField label="Mobile Number"
         {...register("mobileNo")}
         variant="filled"
         color="success" 
         type="text"
         focused
         required />
         <br /><br />
         <TextField label="Enter Your message"
         {...register("message")}
         variant="filled"
         color="success" 
         type="text" 
         focused 
         required/>
         <br /><br />
         <Button variant="contained" color="success"  type="submit">Submit</Button>
      </form>
      </div>
      </div>
  )
}

export default Contact;