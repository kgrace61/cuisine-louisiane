import React, { useState, useEffect } from 'react';
import gallery34 from '../assets/gallery/gallery34.png';

export default function Contact() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100" style={{ paddingTop: navbarHeight + 20 }}> {/* adjust padding-top */}
      <div className="text-center font-julius text-2xl mt-8"> {/* adjust margin-top */}
        <p>Contact us for a quote or with any questions.</p>
        <p>Chef Tiger Grace: 225 776 0891</p>
        <p>Email: cuisinelouisiane@hotmail.com</p>
        <div className="mt-8 flex justify-center">
          <img 
            src={gallery34} 
            alt="James Grace House" 
            style={{ width: '700px', height: 'auto' }} //adjust px for img size
          />
        </div>
      </div>
    </div>
  );
}