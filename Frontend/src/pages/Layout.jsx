import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Outlet,useNavigate} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { handleAxiosError } from '../../handleAxiorError';
import {logout} from "../Redux/authSlice"
import {useSelector,useDispatch} from 'react-redux';
import {setSuccess,setError} from "../Redux/flashSlice.js"

export default function Layout(){
    const user = useSelector((state) => state.auth.user);
    const {success,error}=useSelector((state)=>state.flashMessages);
  const navigate=useNavigate();
const dispatch=useDispatch();


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
      dispatch(setSuccess("Successfully logged out"));
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
         <Navbar expand="lg" className="bg-success" variant="dark">
      <Container fluid>
         <Navbar.Brand href="/">Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addEducation">Add Education</Nav.Link>
            <Nav.Link href="/addProject">Add Project</Nav.Link>
            <Nav.Link href="/contact">Contact Me</Nav.Link>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <Outlet/>
</div>
  )
}