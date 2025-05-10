import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'

function Contact()
{
  let [FormData,SetFormData]=useState({
    name:"",
    organisation:"",
    mobileNo:"",
    message:""
  });

  let [flashMessage,setFlashMessage]=useState({
    success:"",
    error:""
  });

  const navigate=useNavigate();

  let HandleFormData=(event)=>{
    SetFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};

    let HandleForm=async(event)=>{
      event.preventDefault();
      console.log(FormData);
     
      try{
     
      await axios.post("http://localhost:8080/contact/new",FormData);
      setFlashMessage({success:"Successfully Send your data to Admin"});
      setTimeout(()=>setFlashMessage({success:""}),4000);
      setTimeout(()=>{navigate('/')},4000);
      SetFormData({
    name:"",
    organisation:"",
    mobileNo:"",
    message:""
      })}
      catch(err)
      {
        setFlashMessage({error:"Unable to send this to Admin."});
        setTimeout(()=>setFlashMessage({error:""}),4000);
      }
    };

  return (
    <div className="Form">
      {flashMessage.success? <div style={{color:"green"}}>{flashMessage.success}</div>:<div style={{color:"red"}}>{flashMessage.error}</div>}
       <h3 style={{textAlign:"",color:"green"}}>Contact Us</h3>
  <div className="ContactForm">
   
    <form onSubmit={HandleForm}>

        <TextField label=" Your Name"
         variant="filled"
          color="success" 
          type="text"
          name="name" 
          value={FormData.name}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Organisation Name"
         variant="filled"
          color="success" 
          type="text"
          name="organisation" 
          value={FormData.organisation}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Mobile Number"
         variant="filled"
          color="success" 
          type="text"
          name="mobileNo" 
          value={FormData.mobileNo}
          onChange={HandleFormData}
          focused
          required />
          <br /><br />
          <TextField label="Enter Your message"
         variant="filled"
         color="success" 
         type="text" 
         name="message"
          value={FormData.message}
          onChange={HandleFormData}
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