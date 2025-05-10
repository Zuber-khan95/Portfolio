import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Routes , Route , useNavigate }  from 'react-router-dom';
import Home from './pages/Home'
import Layout from './pages/Layout'
import Login from './pages/Login'
import AddEducation from './pages/AddEducation'
import AddProject from './pages/AddProject';
import Contact from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout/>}> 
    <Route index element={<Home/>}/>
    <Route path='addEducation' element={<AddEducation/>}/> 
      <Route path='addProject' element={<AddProject/>}/> 
     <Route path='login' element={<Login/>}/>
    <Route path='contact' element={<Contact/>}/>
    <Route path='adminPanel' element={<AdminPanel/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
     )
}

export default App
