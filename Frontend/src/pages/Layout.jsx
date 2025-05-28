import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import {Outlet,useNavigate} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';
import { handleAxiosError } from '../../handleAxiorError';
import {logout} from "../Redux/authSlice"
import {useSelector} from 'react-redux';

export default function Layout(){
    const user = useSelector((state) => state.auth.user);
  const navigate=useNavigate();
const dispatch=useDispatch();
  let [flashMessage,setFlashMessage]=useState({success:"",error:""});

let handleLogout=async()=>{ 
  try{
    const token=localStorage.getItem("token");
    const res=await axios.post("http://localhost:8080/logout",{},{
        headers: {
    Authorization: `Bearer ${token}`,
  },
    });
    if(res.data.status===200)
    { 
      dispatch(logout());
      setFlashMessage({success:"Successfully logged out"});
      setTimeout(()=>{setFlashMessage({success:""});},4000);
    setTimeout(()=>{navigate("/");},4000);
    }
  }
  catch(err)
  {
    const errorMsg = handleAxiosError(err);
    console.log(errorMsg);
  }
}
  return (
<div>
      <Navbar bg="success" data-bs-theme="dark" expand='md' >
        <Container>
          <Navbar.Brand href="/">Portfolio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addEducation">Add Education</Nav.Link>
            <Nav.Link href="/addProject">Add Project</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            <Nav.Link href="/adminPanel">Admin Panel</Nav.Link>
               </Nav>
              
                {!user && <Nav className="ms-auto">
                  <Nav.Link href="/login">login</Nav.Link>
            <Nav.Link href="/signup">SignUp</Nav.Link>
             </Nav>
                }
            {user && <Nav className="ms-auto">
             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
             </Nav>}
        </Container>
      </Navbar>
        {flashMessage.success && <div className="alert alert-success">{flashMessage.success}</div>}
  {flashMessage.error && <div className="alert alert-danger">{flashMessage.error}</div>}
  <Outlet/>
</div>
  )
}