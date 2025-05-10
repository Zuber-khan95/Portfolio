import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-date-picker'
axios.defaults.withCredentials=true;
// import './AddProject.css'

export default function AddProject()
{
  
  let [FormData,SetFormData]=useState({
    title:"",
    description:"",
    githubLink:"",
    startingDate:"",
    endingDate:""
  });

  let [flashMsg,setFlashMsg]=useState({success:"",error:""});

  const navigate=useNavigate();

  let HandleFormData=(event)=>{
    SetFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};

    let HandleForm=async(event)=>{
      console.log(FormData);
      try{
       
      const response=await axios.post('http://localhost:8080/project/new',FormData);
      event.preventDefault();
      if(response.data.state=="success")
      {
        setFlashMsg({success:"Successfully Added Project"});
        SetFormData({
          title:"",
          description:"",
          githubLink:"",
          startingDate:"",
          endingDate:""
        });
        setTimeout(()=>{setFlashMsg({success:""});},4000);
        setTimeout(()=>{navigate("/");},4000);
      }
  
    }
      catch(err)
      {
    console.log(err);
    setFlashMsg({error:"Already existed project."});
    setTimeout(()=>{setFlashMsg({error:""});},4000);
      }
    };

  return (
    <div className="Form">
        {flashMsg.success?<div style={{color:"green"}}>{flashMsg.success}</div>:
        <div style={{color:"red"}}>{flashMsg.error}</div>}
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