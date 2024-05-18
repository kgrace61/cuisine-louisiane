import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import OurVenue from './pages/OurVenue';
import Menus from './pages/Menus';
import Gallery from './pages/Gallery';
import DesignYourMenu from './pages/DesignYourMenu';
import NavBar from './components/NavBar';
import './App.css';
import './input.css'

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourvenue" element={<OurVenue />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/designyourmenu" element={<DesignYourMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;