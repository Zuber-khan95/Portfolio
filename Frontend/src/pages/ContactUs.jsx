import {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { handleAxiosError } from '../../handleAxiorError';

function Contact()
{
  const user=useSelector((state)=>state.auth.user);
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

  useEffect(()=>{
if(flashMessage && flashMessage.success ||flashMessage.error)
{
  setTimeout(()=>{setFlashMessage({success:"",error:""})},4000);
}
  },[flashMessage])

  let HandleFormData=(event)=>{
    SetFormData((CurrData)=>{
      return {...CurrData,[event.target.name]:event.target.value};
    })};
console.log(user);
    let HandleForm=async(event)=>{
      event.preventDefault();
      console.log(FormData);
     
      try{
    await axios.post(`http://localhost:8080/contact/new/${user.userId}`,FormData);
      setFlashMessage({success:"Successfully Send your data to Admin"});
      setTimeout(()=>{navigate('/')},4000);
      SetFormData({
    name:"",
    organisation:"",
    mobileNo:"",
    message:""
      });
     }

      catch(err)
      {
        const errorMsg=handleAxiosError(err);
        if(errorMsg.status===403)
        {
         setFlashMessage({error:"You are not our user please logged in on signup first to do this."});
        }
         if(errorMsg.status===404)
        {
         setFlashMessage({error:"User not found, so you can't do this."});
        }
        if(errorMsg.status===500){
          setFlashMessage({error:"Server Error"});
        }
         if(errorMsg==='Network Error')
        {
         setFlashMessage({error:"Network Error , No response from server."});
        }
           if(errorMsg==="Unexpected error occured")
         {
        setFlashMessage({error:'Some unexpected Error'});
        }
       
      }
    };

  return (
    <div className="Form">
  {flashMessage.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage.error && <div className="alert alert-danger">{flashMessage.error}</div>}
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