import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
axios.defaults.withCredentials=true;
import './AddEducation.css'
import {useSelector} from "react-redux";
import {handleAxiosError}  from '../../handleAxiorError';

export default function AddEducation()
{
  const user=useSelector((state)=>state.auth.user);
  
  let [FormData,SetFormData]=useState({
    graduation:"",
    specialization:"",
    startingYear:"",
    endingYear:""
  });

  let [flashMessage,setFlashMessage]=useState({
    success:"",
    error:""
  })

  const navigate=useNavigate();
useEffect(()=>{
  if(flashMessage && flashMessage.success || flashMessage.error)
  {
    setTimeout(()=>{
      setFlashMessage({success:"",error:""});
    },4000);
  }
},[flashMessage]);

  let HandleFormData=(event)=>{
    SetFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};
  
    let HandleForm=async(event)=>{
      try{
        event.preventDefault();
const response=await axios.post(`http://localhost:8080/education/new/${user.userId}`,FormData);
    if(response.data.state=="success")
    {
            setFlashMessage({success:"Successfully Added Education"});
            SetFormData({
              graduation:"",
              specialization:"",
              startingYear:"",
              endingYear:""
            });
        
             setTimeout(()=>{navigate("/");},4000);
      }
      }
    catch(err){
      const errorMsg=handleAxiosError(err);
      console.log(errorMsg);
      if(errorMsg.status===500){
 setFlashMessage({error:"Server Error or Graduation already existed"});
      }
          if(errorMsg.status===403){
 setFlashMessage({error:"Only Admin are allow to do this"});
      }
      if(errorMsg.status===404)
      {
 setFlashMessage({error:"User not found so unable to add education"});
      }
      if(errorMsg==="Network Error")
             {
 setFlashMessage({error:"Network Error, No response from server"});
      }
     if(errorMsg==="Unexpected error occured")
  {
 setFlashMessage({error:'Need to logged in first'});
 }

    }
    };
    
  return (
    <div className="Form">
  {flashMessage.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage.error && <div className="alert alert-danger">{flashMessage.error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Add Education from here..</h3>
  <div className="AddEducation">
   
    <form onSubmit={HandleForm}>

        <TextField label="Graduation"
         variant="filled"
          color="success" 
          type="text"
          name="graduation" 
          value={FormData.graduation}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Specialization"
         variant="filled"
          color="success" 
          type="text"
          name="specialization" 
          value={FormData.specialization}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Starting Year"
         variant="filled"
         color="success"
         type="text" 
         name="startingYear"  
          value={FormData.startingYear}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <TextField label="Ending Year"
         variant="filled"
         color="success"
         type="text" 
         name="endingYear"  
          value={FormData.endingYear}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <Button variant="contained" color="success" type="submit">Add Education</Button>
      </form>
      </div>
      </div>
  )
}