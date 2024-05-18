import React from 'react'
import veg5 from '../assets/veg5.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Import the Link component
export default function Home() {
  return (
    <div className="home-container text-center mt-[100px]">
      
      <img src={veg5} alt="Cuisine Louisiane" className="w-full mx-auto" />

      <div className="mt-8 px-[2in]">
        <h2 className="text-2xl font-bold font-julius">Offsite Catering</h2>
        <p className="text-lg mt-2 font-julius">We’re ready to help you with any event, from weddings and graduations, to family gatherings and game day feasts, to office lunches or corporate events. We offer full service onsite & offsite catering for any occasion in the greater Baton Rouge area. Big or small, we’re committed making your event absolutely unforgettable. We work closely with you to ensure a seamless experience for both you and your guests.</p>
      </div>
      
      <div className="mt-8 px-[2in] mb-10">
      <Link to="/ourvenue">
        <h2 className="text-2xl font-bold font-julius">Events at James Grace House</h2>
      </Link>
        <p className="text-lg mt-2 font-julius">Our venue, The James Grace House, is set on the grounds of a beautiful antebellum home, where history meets romance, and special memories are made. This southern splendor at its finest offers an affordable and elegant backdrop for your dream wedding, corporate event, or gathering of any size.</p>
      
      </div>
    </div>
  )
}
