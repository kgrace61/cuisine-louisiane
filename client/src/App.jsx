import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import OurVenue from './pages/OurVenue';
import Menus from './pages/Menus';
import Gallery from './pages/Gallery';
import DesignYourMenu from './pages/DesignYourMenu';
import NavBar from './components/NavBar';
import SignIn from './pages/SignIn'
import './App.css';
import './input.css'

function App() {
  // State hook to manage user state
  const [user, setUser] = useState(null)

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetch('http://localhost:5555/authenticate-session')
    .then((res) => {
      if (res.ok){
        return res.json() // Parse JSON data if response is OK
      }else{
        console.error('user not found') // Log error if user not found
      }
    })
    .then(data => setUser(data)) // Update user state with fetched data
    .catch(error => console.error('Error fetching user:', error));
  }, [])

  // Function to update user state
  const updateUser = (user) => {
    setUser(user)
  } 
  
  return (
    <Router>
      <div className="app">
        <NavBar user={user} updateUser={updateUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourvenue" element={<OurVenue />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/designyourmenu" element={<DesignYourMenu user={user} updateUser={updateUser} />} />
          <Route path="/signin" element={<SignIn updateUser={updateUser} user={user}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;