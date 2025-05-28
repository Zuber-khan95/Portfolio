import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-date-picker'
axios.defaults.withCredentials=true;
import { useSelector } from 'react-redux';
import { handleAxiosError } from '../../handleAxiorError';
// import './AddProject.css'

export default function AddProject()
{
  const user=useSelector((state)=>state.auth.user);
  let [FormData,SetFormData]=useState({
    title:"",
    description:"",
    githubLink:"",
    startingDate:"",
    endingDate:""
  });

  let [flashMessage,setFlashMessage]=useState({success:"",error:""});

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
       event.preventDefault();
      try{
      const response=await axios.post(`http://localhost:8080/project/new/${user.userId}`,FormData);
      if(response.data.state=="success")
      {
        setFlashMessage({success:"Successfully Added Project"});
        SetFormData({
          title:"",
          description:"",
          githubLink:"",
          startingDate:"",
          endingDate:""
        });
        setTimeout(()=>{navigate("/");},4000);
      }
  
    }
      catch(err)
      {
    const errorMsg=handleAxiosError(err);
    if(errorMsg.status===403)
    {
   setFlashMessage({error:"Only Admin can Add the project."});
    }
  if(errorMsg.status===404)
      {
 setFlashMessage({error:"User not found so unable to add project"});
      }
       if(errorMsg.status===500)
  {
    setFlashMessage({error:"Server Error or Unable to add project due to existance of project name"});
  }
      if(errorMsg==="Network Error")
             {
 setFlashMessage({error:"Network Error, No response from server"});
      }
     if(errorMsg==="Unexpected error occured")
  {
 setFlashMessage({error:'Need to logged in first as Admin to do this'});
 }
  
      }
    };

  return (
    <div className="Form">
  {flashMessage.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage.error && <div className="alert alert-danger">{flashMessage.error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Add Your Project from here..</h3>
  <div className="AddProject">
   
    <form onSubmit={HandleForm}>

        <TextField label="Title"
         variant="filled"
          color="success" 
          type="text"
          name="title" 
          value={FormData.title}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Description"
         variant="filled"
          color="success" 
          type="text"
          name="description" 
          value={FormData.description}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Github Link"
         variant="filled"
          color="success" 
          type="text"
          name="githubLink" 
          value={FormData.githubLink}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Starting Date"
         variant="filled"
         color="success"
         type="date" 
         name="startingDate"  
          value={FormData.startingDate}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <TextField label="Ending Date"
         variant="filled"
         color="success"
         type="date" 
         name="endingDate"  
          value={FormData.endingDate}
          onChange={HandleFormData}
          focused 
          required/>
          <br /><br />
          <Button variant="contained" color="success" type="submit">Add Project</Button>
      </form>
      </div>
      </div>
  )
}