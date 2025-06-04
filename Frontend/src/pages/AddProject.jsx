import {useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
axios.defaults.withCredentials=true;
import { useSelector,useDispatch } from 'react-redux';
import { handleAxiosError } from '../../handleAxiorError';
import {setSuccess,setError} from '../Redux/flashSlice.js'
import {useForm} from "react-hook-form"
import {projectSchema}  from '../../formValidation.js'
import { yupResolver } from '@hookform/resolvers/yup';


export default function AddProject()
{
const {register,handleSubmit,reset,formState:{errors}}=useForm({
  resolver:yupResolver(projectSchema),
  defaultValues:{
  title:"",
    description:"",
    githubLink:"",
    startingDate:"",
    endingDate:"",
    skills:""
  }
});
 
   const user=useSelector((state)=>state.auth.user);
  const { success,error } =useSelector((state)=>state.flashMessages);
  const dispatch=useDispatch();

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
      const response=await axios.post(`http://localhost:8080/project/new/${user.userId}`,FormData);
      if(response.data.state=="success")
      {
        dispatch(setSuccess("Successfully Added Project"));
        reset();
        setTimeout(()=>{navigate("/");},4000);
      }
  
    }
      catch(err)
      {
    const errorMsg=handleAxiosError(err);
     if(errorMsg.status===403)
    {
   dispatch(setError("Only Admin can Add the project."));
    }
    if(errorMsg.status===404)
   {
    dispatch(setError("User not found so unable to add project"));
   }
    if(errorMsg.status===500)
   {
    dispatch(setError("Server Error or Unable to add project due to existance of project name"));
   }
    if(errorMsg==="Network Error")
   {
    dispatch(setError("Network Error, No response from server."));
   }
    if(errorMsg==="Unexpected error occured")
   {
    dispatch(setError("Need to logged in first as Admin to do this"));
   }
  
      }
    };
   console.log(errors);
  return (
    <div className="Form">
  {success && <div className="alert alert-success">{success}</div>}
  {error && <div className="alert alert-danger">{error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Add Your Project from here..</h3>
  <div className="AddProject">
   
    <form onSubmit={handleSubmit(onSubmit)}>

        <TextField label="Title"
        {...register("title")}
         variant="filled"
          color="success" 
          type="text"
          focused
           fullWidth />
          {errors.title && <p className="error">{errors.title.message}</p>}
          <br /><br />
          <TextField label="Description"
             {...register("description")}
         variant="filled"
          color="success" 
          type="text"
          focused
          fullWidth />
          {errors.description && <p className="error">{errors.description.message}</p>}
          <br /><br />
            <TextField label="skills"
             {...register("skills")}
         variant="filled"
          color="success" 
          type="text"
          focused
          fullWidth />
          {errors.skills && <p className="error">{errors.skills.message}</p>}
          <br /><br />
          <TextField label="Github Link"
             {...register("githubLink")}
         variant="filled"
          color="success" 
          type="text"
          focused
           fullWidth/>
          {errors.githubLink && <p className="error">{errors.githubLink.message}</p>}
          <br /><br />
          <TextField label="Starting Date"
             {...register("startingDate")}
         variant="filled"
         color="success"
         type="date" 
          focused 
          fullWidth/>
          {errors.startingDate && <p className="error">{errors.startingDate.message}</p>}
          <br /><br />
          <TextField label="Ending Date"
             {...register("endingDate")}
         variant="filled"
         color="success"
         type="date" 
          focused 
           fullWidth/>
          {errors.endingDate && <p className="error">{errors.endingDate.message}</p>}
          <br /><br />
          <Button variant="contained" color="success" type="submit">Add Project</Button>
      </form>
      </div>
      </div>
  )
}