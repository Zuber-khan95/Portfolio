import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import {Link,Outlet} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default function Layout(){

  return (
<div>
      <Navbar bg="success" data-bs-theme="dark" expand='md' >
        <Container>
          <Navbar.Brand href="/">Portfolio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addEducation">Add Education</Nav.Link>
            <Nav.Link href="/addProject">Add Project</Nav.Link>
            <Nav.Link href="/login">login</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            <Nav.Link href="/adminPanel">Admin Panel</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  <Outlet/>
</div>
  )
}