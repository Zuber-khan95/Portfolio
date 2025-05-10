import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css'
import { FaGithub } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";
export default function Home()
{
    let [educationData,setEducationData]=useState([]);
    let [projectData,setProjectData]=useState([]);
      let [flashMsg,setFlashMsg]=useState({
        success:"",
        error:""
      })
    
      const navigate=useNavigate();
    useEffect(()=>{
getEducationData();
getProjectData();

    },[educationData]);


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
    let response=await axios.delete(`http://localhost:8080/education/${itemId}`);
    console.log(response.data.state);
    if(response.data.state=="success"){
      setFlashMsg({success:"Successfully Education deleted"});
      setTimeout(()=>{setFlashMsg({success:""});},4000);
}
}  
catch(err){
setFlashMsg({error:"Unable to delete ,Only Admin can delete."});
  setTimeout(()=>{setFlashMsg({error:""});},4000);
    }
  }

 let handleDeleteProject=async(itemId)=>{
  try{
    let response=await axios.delete(`http://localhost:8080/project/${itemId}`);
    if(response.data.state=="success"){
      setFlashMsg({success:"Successfully Project deleted"});
      setTimeout(()=>{setFlashMsg({success:""});},4000);
}
}  
catch(err){
setFlashMsg({error:"Unable to delete ,Only Admin can delete."});
  setTimeout(()=>{setFlashMsg({error:""});},4000);
    }
  }
  

      let handleLogout=async()=>{
        try{
          const response=await axios.delete('http://localhost:8080/logout');
          console.log(response.data.state);
        }
        
        catch(err){
          console.log(err);
        }
    }

    return (
        <div>
        <br />
        {flashMsg.success?<div style={{color:"green"}}>{flashMsg.success}</div>:
<div style={{color:"red"}}>{flashMsg.error}</div>}
        <Button style={{marginRight:'5px'}} onClick={handleLogout}>logout</Button>
            <h1>Zuber khan</h1>
            <h3>Full Stack Web Developer</h3>
            <div>
              <a href="https://www.instagram.com/khan_zuber95?igsh=MTR5YXBmMTM1dWVqcA==" target="_blank"><SiInstagram/></a>
            &nbsp;&nbsp;
            <a href="https://github.com/Zuber-Khan95" target="_blank"><FaGithub/></a>&nbsp;&nbsp;
              <a  href="https://www.linkedin.com/in/zuber-khan-028603336?utm_source=share&utm_compaign=share_via&utm_content=profile&utm_medium-android_app" target="_blank"><TfiLinkedin/></a>&nbsp;&nbsp;
            
            </div>
        <br />
            <p className='para'>I am a passionate Full Stack MERN Web Developer(MongoDB, Express.js, React.js, Node.js) with a strong focus 
                on building dynamic, responsive, and user-friendly web applications. As a fresher , I thrive 
                on turning creative ideas into real world solutions through clean, efficient, and maintainable
                code. I am continously learning new technologies to enhance my skills and deliver high-quality, 
                scalable digital experiences. 
            </p>
          
            {educationData&&
            <div key='educationData.id'>
            <h3>Education</h3>

             
{educationData.map((item,index)=>(
  <Card className="card">
  
 <Card.Header><span>{item.graduation}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <span>{item.startingYear}-{item.endingYear}</span></Card.Header>
 <Card.Body>
   <blockquote className="blockquote mb-0">
     <p>
    {item.specialization}
     </p>
<Button onClick={()=>{handleDeleteEducation(item._id);}}>Delete</Button>
   </blockquote>
 </Card.Body>
</Card>
))}    
</div>} 

{projectData?<div key='projectData.id'>
            <h3>Projects</h3>    
{projectData.map((project,index)=>(
  <Card className="card">
  
 <Card.Header><span>{project.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
))}    
</div>:<div>Loading..</div>}  

        </div>
    )
}