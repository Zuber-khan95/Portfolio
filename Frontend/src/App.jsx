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
import ProtectedRoutesForAdmin from './pages/ProtectedRoutesForAdmin'
import ProtectedRoutesForUser from './pages/ProtectedRoutesForUser'
import SignUp from './pages/Signup'
import {Provider} from 'react-redux';
import store from "./Redux/store"

function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>

        <Route path='/' element={<Layout/>}> 
    <Route index element={<Home/>}/>
    <Route path='addEducation' element={ <ProtectedRoutesForAdmin><AddEducation/></ProtectedRoutesForAdmin>}/>
      <Route path='addProject' element={<ProtectedRoutesForAdmin><AddProject/></ProtectedRoutesForAdmin>}/> 
          <Route path='adminPanel' element={<ProtectedRoutesForAdmin><AdminPanel/></ProtectedRoutesForAdmin>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='signup' element={<SignUp/>}/>
    <Route path='contact' element={<ProtectedRoutesForUser><Contact/></ProtectedRoutesForUser>}/>
    <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Route>
    </Routes>
      </BrowserRouter>
  </Provider>
    </>
     )
}

export default App
