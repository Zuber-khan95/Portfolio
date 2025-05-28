import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { handleAxiosError } from '../../handleAxiorError'

export default function SignUp()
{
  const {register,reset,handleSubmit,formState:{errors}}=useForm({defaultValues:{
    email:"",
    password:""
  }});

    let [flashMessage,setFlashMessage]=useState({
      success:"",
      error:""
    });

      useEffect(() => {
    if (flashMessage.success || flashMessage.error) {
      const timer = setTimeout(() => setFlashMessage({ success: '', error: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);
  
    const navigate=useNavigate();

    let onSubmit=async(FormData)=>{
      try{
        const response=await axios.post("http://localhost:8080/register",FormData);

        if(response.data.status===200){
         setFlashMessage({success:"Successfully signedUp"});
          setTimeout(()=>navigate('/'),4000);
    reset()
        }
      }  
      catch(err)
      {
        const errorMsg=handleAxiosError(err);

        if(errorMsg.status===409)
        {
        setFlashMessage({error:"Email already Exists. Try another one"});
      }
      else if(errorMsg.status===400)
      {
        setFlashMessage({error:"Email and Password should be required and in String Format"});
    
      }
        else{
          console.log(errorMsg);
          setFlashMessage({error:"internal server error"});
        }
    }
  };
  return (
    <div className="Form">
  {flashMessage.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage.error && <div className="alert alert-danger">{flashMessage.error}</div>}
       <h3 style={{textAlign:"centre",color:"green"}}>SignUp Form</h3>
  <div className="login">
     <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email"
        {...register("email")}
         variant="filled"
          color="success" 
          type="email"
          name="email" 
          focused
          required />
          <br /><br />
          <TextField label="password"
          {...register("password")}
         variant="filled"
         color="success"
         type="password" 
         name="password"
          focused />
          <br /><br />
          <Button variant="contained" color="success" type="submit">SignUp</Button>
      </form>
      </div>
      </div>
  )
}

