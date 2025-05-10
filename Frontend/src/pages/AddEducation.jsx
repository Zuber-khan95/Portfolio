import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
axios.defaults.withCredentials=true;
import './AddEducation.css'

export default function AddEducation()
{
  
  let [FormData,SetFormData]=useState({
    graduation:"",
    specialization:"",
    startingYear:"",
    endingYear:""
  });

  let [flashMsg,setFlashMsg]=useState({
    success:"",
    error:""
  })

  const navigate=useNavigate();

  let HandleFormData=(event)=>{
    SetFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};
  
    let HandleForm=async(event)=>{
      try{
        event.preventDefault();
    const response=await axios.post('http://localhost:8080/education/new',FormData);
    if(response.data.state=="success")
    {
            setFlashMsg({success:"Successfully Added Education"});
            SetFormData({
              graduation:"",
              specialization:"",
              startingYear:"",
              endingYear:""
            });
             setTimeout(()=>{setFlashMsg({success:""});},4000);
             setTimeout(()=>{navigate("/");},4000);
      }
      }  
    catch(err){
      setFlashMsg({error:"Graduation already existed so this Education can not be added."});
        setTimeout(()=>{setFlashMsg({error:""});},4000);
      console.log(err);
    };
    };

  return (
    <div className="Form">
{flashMsg.success?<div style={{color:"green"}}>{flashMsg.success}</div>:
<div style={{color:"red"}}>{flashMsg.error}</div>}
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