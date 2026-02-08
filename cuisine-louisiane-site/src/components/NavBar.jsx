import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white fixed w-full top-0 z-20 border-b">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center">

        {/* Logo */}
        <div className="text-4xl md:text-6xl font-semibold font-pinyon text-maroon text-center md:text-left">
          <Link to="/">Cuisine Louisiane</Link>
        </div>

        {/* Links */}
        <div className="
          mt-2 md:mt-0
          flex flex-wrap justify-center md:justify-end
          gap-x-5 gap-y-2
          font-julius text-black
          text-sm md:text-base
        ">
          <Link to="/about" className="hover:text-gray-900">About</Link>
          <Link to="/ourvenue" className="hover:text-gray-900">Our Venue</Link>
          <Link to="/menus" className="hover:text-gray-900">Menus</Link>
          <Link to="/gallery" className="hover:text-gray-900">Gallery</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact Us</Link>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;