import {useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { handleAxiosError } from '../../handleAxiorError'
import { useSelector,useDispatch } from 'react-redux';
import { setSuccess,setError } from '../Redux/flashSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../formValidation';

export default function SignUp()
{
let {register,handleSubmit,reset,formState:{errors}}=useForm({
  resolver:yupResolver(userSchema),
  defaultValues:{
  email:"",
  password:"",
  confirmPassword:""
 }});

const {success,error} =useSelector((state)=>state.flashMessages);
    const dispatch = useDispatch();

    useEffect(() => {
    if (success || error) {
  setTimeout(()=>{
dispatch(setSuccess(''));
dispatch(setError(''));
  },4000);
    }}, [success,error]);

    const navigate=useNavigate();

    let onSubmit=async(FormData)=>{
      try{
        const response=await axios.post("http://localhost:8080/register",FormData);
        if(response.data.status===200){
      dispatch(setSuccess('Successfully signed Up'));
          setTimeout(()=>navigate('/'),4000);
          reset()
        }
      }  
      catch(err)
      {
        const errorMsg=handleAxiosError(err);

        if(errorMsg.status===400){
        dispatch(setError("Email and password is required and should be string"));
        }
         if(errorMsg.status===409){
        dispatch(setError("Email id already exists."));
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
       <h3 style={{textAlign:"centre",color:"green"}}>SignUp Form</h3>
  <div className="login">
     <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email"
        {...register("email")}
         variant="filled"
          color="success" 
          type="email"
          focused
          fullWidth
         />
         {errors.email && <p className='error'>{errors.email.message}</p>}
          <br /><br />
          <TextField label="Password"
          {...register("password")}
         variant="filled"
         color="success"
         type="password" 
         focused
         fullWidth
          />
          {errors.password && <p className='error'>{errors.password.message}</p>}
          <br /><br />
             <TextField label="Confirm Password"
          {...register("confirmPassword")}
         variant="filled"
         color="success"
         type="password" 
         focused
         fullWidth
          />
          {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}
          <br /><br />
          <Button variant="contained" color="success" type="submit">SignUp</Button>
      </form>
      </div>
      </div>
  )
}

