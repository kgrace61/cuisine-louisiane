import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ user, updateUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5555/logout')
      .then(res => res.json())
      .then(data => {
        localStorage.removeItem('user');
        updateUser(null);
        navigate('/signin', { replace: true });
      })
      .catch(error => console.error('Error logging out:', error));
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-6xl font-semibold font-pinyon text-maroon">
          <Link to="/">Cuisine Louisiane</Link>
        </div>
        <div className="flex space-x-4 font-julius text-black">
          <Link to="/about" className="hover:text-gray-900">About</Link>
          <Link to="/ourvenue" className="hover:text-gray-900">Our Venue</Link>
          <Link to="/menus" className="hover:text-gray-900">Menus</Link>
          <Link to="/gallery" className="hover:text-gray-900">Gallery</Link>
          <Link to="/designyourmenu" className="hover:text-gray-900">Design Your Menu</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact Us</Link>
          {user ? (
            <>
              <span className="hover:text-gray-900">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="hover:text-gray-900">Logout</button>
            </>
          ) : (
            <Link to="/signin" className="hover:text-gray-900">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;