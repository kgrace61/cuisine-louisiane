import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import OurVenue from './pages/OurVenue';
import Menus from './pages/Menus';
import Gallery from './pages/Gallery';
import DesignYourMenu from './pages/DesignYourMenu';
import SavedMenus from './pages/SavedMenus';
import NavBar from './components/NavBar';
import SignIn from './pages/SignIn';
import './App.css';
import './input.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user'); // Remove invalid data from localStorage
      }
    } else {
      fetch('http://localhost:5555/authenticate-session', {
        credentials: 'include',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error('User not found');
        }
      })
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));
    }
  }, []);

  const updateUser = (user) => {
    setUser(user);
  };

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
          <Route path="/savedmenus" element={<SavedMenus user={user} updateUser={updateUser} />} />
          <Route path="/signin" element={<SignIn updateUser={updateUser} user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;