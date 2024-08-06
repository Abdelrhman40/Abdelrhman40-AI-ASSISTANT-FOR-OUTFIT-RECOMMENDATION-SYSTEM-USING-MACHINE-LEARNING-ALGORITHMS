import { Navigate, Route , Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Features from './Components/Features/Features';
import SizePage from './Components/SizePage/SizePage';
import ClothesTypes from './Components/ClothesTypes/ClothesTypes';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Recommendedcloths from './Components/RecommendCloths/Recommended_cloths';
import RecommendedColors from './Components/RecommendColors/RecommendColors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Components/Dashboard/Dashboard';
import Creat from './CreatItem/CreatItem';
import UserPage from './Components/UserPage/UserPage';


function App() {

  const [userData , setUserDate] = useState(null);
  // const [role , setRole] = useState("");
  const navigator = useNavigate();
  async function logOut() {
    await axios.post('https://clothes-style.site/api/logout',{"access_token":localStorage.getItem('UserToken')}, {
      headers: {
        access_token: localStorage.getItem('UserToken')
      }
    });
    localStorage.removeItem('UserToken');
    localStorage.removeItem('user');
    setUserDate(null);
    navigator('/login')
  }

   function handleUser() {
      let user = localStorage.getItem('user');
      let parsedUser = JSON.parse(user);
      setUserDate(parsedUser);
  }

  function ProtectedRoute({children}) {
    if (!localStorage.getItem('UserToken')) {
      return <Navigate to='/login' />
    } else {
      return children;
    }
  }
  
  function ProtectedRouteAdmin({children}) {
    if ( JSON.parse(localStorage.getItem('user')).role === "admin") {
      // console.log(JSON.parse(localStorage.getItem('user')).role);
      return children;
    } else {
      // console.log(JSON.parse(localStorage.getItem('user')).role);
      return <Navigate to='/home' />
    }
  }

  useEffect(()=>{
    if (localStorage.getItem('user')) {
      handleUser();
    }
  },[])


  return (
    <>
      <Navbar user={userData} logOut={logOut}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/features' element={<Features />}/>
        <Route path='/userpage' element={<ProtectedRoute><UserPage user={userData} /></ProtectedRoute>}/>
        <Route path='/sizepage' element={<ProtectedRoute><SizePage /></ProtectedRoute>}/>
        <Route path='/clothestypes' element={<ProtectedRoute><ClothesTypes /></ProtectedRoute>}/>
        <Route path='/cloths_recommendation' element={<ProtectedRoute><Recommendedcloths /></ProtectedRoute>}/>
        <Route path='/colors_recommendation' element={<ProtectedRoute><RecommendedColors /></ProtectedRoute>}/>
        <Route path='/dashboard' element={<ProtectedRoute><ProtectedRouteAdmin><Dashboard /></ProtectedRouteAdmin></ProtectedRoute>}/>
        <Route path='/create' element={<ProtectedRoute><ProtectedRouteAdmin><Creat /></ProtectedRouteAdmin></ProtectedRoute>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login handleUser={handleUser}  />}/>
      </Routes>
      
    </>
  );
}

export default App;
