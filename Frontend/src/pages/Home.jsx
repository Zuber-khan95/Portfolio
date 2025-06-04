import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css'
import { FaGithub } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";
import { handleAxiosError } from '../../handleAxiorError.js'
import { useSelector,useDispatch } from 'react-redux';
import {setSuccess,setError} from '../Redux/flashSlice.js'

export default function Home()
{
  
    let [educationData,setEducationData]=useState([]);
    let [projectData,setProjectData]=useState([]);
    
    const user = useSelector((state) => state.auth.user);
    const {success,error}=useSelector((state)=>state.flashMessages);
    const dispatch=useDispatch();
      const navigate=useNavigate();
    useEffect(()=>{
getEducationData();
getProjectData();

// getUserData();
    },[educationData]);

  
    useEffect(()=>{
      if(success ||error)
      {
      setTimeout(()=>{
      dispatch(setSuccess(''));
      dispatch(setError(''));
    },4000);
      }
   
    },[success,error]);

    let getEducationData=async()=>{
        await axios.get("http://localhost:8080/education").then((response)=>{
            setEducationData(response.data.data);
          
        }).catch((err)=>{
            console.log(err);
        })
    }
    let getProjectData=async()=>{
        await axios.get("http://localhost:8080/project").then((response)=>{
            setProjectData(response.data.data);
          
        }).catch((err)=>{
            console.log(err);
        })
    }

 let handleDeleteEducation=async(itemId)=>{
  try{
    const response=await axios.delete(`http://localhost:8080/education/${itemId}/${user.userId}`);
    console.log(response.data.state);
    if(response.data.state=="success"){
      dispatch(setSuccess("Successfully Education deleted"));
}
}  
catch(err){

  const errorMsg=handleAxiosError(err);

    if(errorMsg.status===403)
  {
    dispatch(setError("Only Admin can delete the education"));
  }
    if(errorMsg.status===404)
  {
    dispatch(setError("Education or User not found"));
  }
  if(errorMsg.status===500)
  {
    dispatch(setError("Server Error or Unable to delete education"));
  }
  if(errorMsg==="Network Error")
  {
    dispatch(setError("Network Error, No response from server"));
  }
  if(errorMsg==="Unexpected error occured")
  {
   dispatch(setError('Need to logged in first as Admin to do this'));
  }
    }
  };

 let handleDeleteProject=async(itemId)=>{
  try{
    let response=await axios.delete(`http://localhost:8080/project/${itemId}/${user.userId}`);
    if(response.data.state=="success") 
    {
      dispatch(setSuccess("Successfully Project deleted"));
    } 
   }  
catch(err){
  const errorMsg=handleAxiosError(err);
  if(errorMsg.status===403)
{
  dispatch(setError("Only Admin is allowed to do this"));
}
  if(errorMsg.status===404)
{
  dispatch(setError("Project or User not found so unable to delete"));
}
 if(errorMsg.status===500)
{
  dispatch(setError("Server Error or Unable to delete education"));
}
if(errorMsg==="Network Error")
{
 dispatch(setError("Network Error, no response from server side")); 
}
if(errorMsg==="Unexpected error occured")
{
 dispatch(setError('Need to logged in first as Admin to do this'));
}
}
};

const getdata=async()=>{
  try{
const response=await axios.get("http://localhost:8080");
console.log(response);
  }
  catch(err)
  {
    console.log(err);
  }
}

console.log(projectData);
    return (
<div>
  {success && <div className="alert alert-success">{success}</div>}
  {error && <div className="alert alert-danger">{error}</div>}
  <div className="hero-section">
  <h1>Hello, I'm Zuber khan</h1>
  <h3>Full Stack Web Developer</h3>
  <div className="social-icons">
    <a href="https://www.instagram.com/khan_zuber95..." target="_blank"><SiInstagram /></a>
    <a href="https://github.com/Zuber-Khan95" target="_blank"><FaGithub /></a>
    <a href="https://www.linkedin.com/in/zuber-khan..." target="_blank"><TfiLinkedin /></a>
</div>
 </div>

 {/* This is our skill section  */} 
       <div className='skills-section'>
       <h2>Skills</h2>
       <br />
<div>HTML</div> <div>CSS</div> <div>JavaScript</div> <div>React</div> <div>Node.js</div>
<div>MongoDB</div> <div>Express.js</div><div>BootStrap</div><div>Git</div><div>Redux</div>
       </div>

 {/* This is our education section */}
<div className="education-section">
   {educationData.length>0 && <h2>Education</h2>}
   <div className="education-cards" >
    {educationData.map((education,index)=>(
      <div className="education-card" key={index}>
      <h4>{education.graduation}</h4>
      <p>{education.university},  {education.startingYear}-{education.endingYear}</p>
      <p>{education.specialization}</p>
      <Button onClick={()=>{handleDeleteEducation(education._id);}}>Delete</Button>
      </div>
))};
</div>
</div>

{/* This is our project section */}
<div className="project-section">
   {projectData.length>0 && <h2>Projects</h2>}
   <div className="project_cards">
    {projectData.map((project,index)=>(
      <div className="project_card" key={index}>
      <h4>{project.title}</h4>
      <p>{project.skills}</p>
      <p>From {project.startingDate.substr(0,10)} to {project.endingDate.substr(0,10)}</p>
      <p>{project.description}</p>
      <a href={project.githubLink} target='_blank'>View Project</a>
      <br />
      <Button onClick={()=>{handleDeleteProject(project._id);}}>Delete</Button>
      </div>
))};
</div>
</div>


 </div>
    );
}