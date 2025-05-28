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
import { useSelector } from 'react-redux';
export default function Home()
{
  const user = useSelector((state) => state.auth.user);
    let [educationData,setEducationData]=useState([]);
    let [projectData,setProjectData]=useState([]);
      let [flashMessage,setFlashMessage]=useState({
        success:"",
        error:""});
    
      const navigate=useNavigate();
    useEffect(()=>{
getEducationData();
getProjectData();
// getUserData();
    },[educationData]);

    useEffect(()=>{
      if(flashMessage && flashMessage.success ||flashMessage.error)
      {
      setTimeout(()=>{
      setFlashMessage({success:"",error:""});
    },4000);
      }
   
    },[flashMessage]);



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
      setFlashMessage({success:"Successfully Education deleted"});
}
}  
catch(err){

  const errorMsg=handleAxiosError(err);

    if(errorMsg.status===403)
  {
    setFlashMessage({error:"Only Admin can delete the education"});
  }

    if(errorMsg.status===404)
  {
    setFlashMessage({error:"Education or User not found"});
  }
  if(errorMsg.status===500)
  {
    setFlashMessage({error:"Server Error or Unable to delete education"});
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

 let handleDeleteProject=async(itemId)=>{
  try{
    let response=await axios.delete(`http://localhost:8080/project/${itemId}/${user.userId}`);
    if(response.data.state=="success"){
      setFlashMessage({success:"Successfully Project deleted"});
 
}
}  
catch(err){
  const errorMsg=handleAxiosError(err);
  if(errorMsg.status===403)
{
  setFlashMessage({error:"Only Admin is allowed to do this"});
}
  if(errorMsg.status===404)
{
  setFlashMessage({error:"Project or User not found so unable to delete"});
}
 if(errorMsg.status===500)
  {
    setFlashMessage({error:"Server Error or Unable to delete education"});
  }
if(errorMsg==="Network Error")
{
   setFlashMessage({error:"Network Error, no response from server side"}); 
}
if(errorMsg==="Unexpected error occured")
{
 setFlashMessage({error:'Need to logged in first as Admin to do this'});
}
 
    }
  };

//   let getUserData=async()=>{
//     try{
// const response=await axios.get(`http://localhost:8080/${user.userId}`);
// console.log(response.data.status);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }

    return (
<div>
  {flashMessage?.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage?.error && <div className="alert alert-danger">{flashMessage.error}</div>}
           <div className="hero-section">
  <h1>Zuber Khan</h1>
  <h3>Full Stack Web Developer</h3>
  <div className="social-icons">
    <a href="https://www.instagram.com/khan_zuber95..." target="_blank"><SiInstagram /></a>
    <a href="https://github.com/Zuber-Khan95" target="_blank"><FaGithub /></a>
    <a href="https://www.linkedin.com/in/zuber-khan..." target="_blank"><TfiLinkedin /></a>
</div>

            </div>
        <br />
            <p className='para'>I am a passionate Full Stack MERN Web Developer(MongoDB, Express.js, React.js, Node.js) with a strong focus 
                on building dynamic, responsive, and user-friendly web applications. As a fresher , I thrive 
                on turning creative ideas into real world solutions through clean, efficient, and maintainable
                code. I am continously learning new technologies to enhance my skills and deliver high-quality, 
                scalable digital experiences. 
            </p>
              {educationData.length>0 &&
            <h3>Education</h3>}
    {educationData.map((item,index)=>(
  <Card className="card" key={index}>
  
 <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>{item.graduation}</span>
 <span >{item.startingYear}-{item.endingYear}</span></Card.Header>
 <Card.Body>
   <blockquote className="blockquote mb-0">
     <p>
    {item.specialization}
     </p>
     <Button onClick={()=>{handleDeleteEducation(item._id);}}>Delete</Button>
   </blockquote>
 </Card.Body>
</Card>
))};

{projectData.length>0 &&<h3>Projects</h3> } 
 
 {projectData.map((project,index)=>(
  <Card className="card">
  
 <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>{project.title}</span>
 <span>{project.startingDate.substring(0,10)} to {project.endingDate.substring(0,10)}</span></Card.Header>
 <Card.Body>
   <blockquote className="blockquote mb-0">
     <p>
    {project.description}
     </p>
     <p><b>Github Link:</b>
      <a href={project.githubLink} target="_blank">{project.githubLink}</a>
      </p>
       <Button onClick={()=>{handleDeleteProject(project._id);}}>Delete</Button>
     
   </blockquote>
 </Card.Body>
</Card>
))};


        </div>
    );
}