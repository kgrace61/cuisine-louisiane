import React from 'react';
import crawfish from '../assets/crawfish.png'; 
import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import chafing2 from '../assets/chafing2.png'; 

export default function About() {
  return (
    <div className="px-[2in] pt-[1in] font-sans">
      <div className="flex flex-col space-y-8">
        {/* First Row: Image on the left, text on the right */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img 
            src={about1} 
            alt="chef tiger" 
            className="max-w-xs md:max-w-xs w-auto h-auto" 
            style={{ maxWidth: '400px', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} 
          />
          <p className="text-center md:w-1/2 font-julius md:ml-4">
            For nearly 25 years, Chef James E. "Tiger" Grace, a graduate of the prestigious École de Cuisine La Varenne in Paris, France, has been delighting the palates of South Louisiana with his exceptional culinary artistry. Drawing inspiration from both his classical French culinary training and the rich cultural tapestry of the region, Chef Tiger seamlessly blends the flavors and techniques of French cuisine with the essence of southern hospitality.
            <br /><br />
            His menus showcase a harmonious fusion of these two culinary worlds, where the refinement of French gastronomy meets the robust and vibrant flavors of South Louisiana. Each dish is a masterful symphony of flavors, expertly crafted to tantalize the senses and transport diners on a journey through the diverse culinary landscapes of France and the American South.
          </p>
        </div>

        {/* Second Row: Image on the right, text on the left */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-center md:w-1/2 order-2 md:order-1 font-julius md:mr-4">
            We understand that every event is a reflection of your personal style and preferences. That's why we work closely with you, ensuring a seamless and personalized experience from start to finish. Our dedicated team will guide you through the planning process, offering expert advice and tailoring every aspect to your specific needs and desires.
            <br /><br />
            Whether you prefer the convenience of offsite catering or the ambiance of our stunning venue, The James Grace House, we are equipped to handle events of any size and scale. Our full-service catering offerings include everything from menu planning and setup to staffing and cleanup, allowing you to relax and enjoy the moment while we take care of the details.
          </p>
          <img 
            src={chafing2} 
            alt="crawfish" 
            className="w-full md:w-1/2 h-auto order-1 md:order-2" 
          />
        </div>

        {/* Third Row: Two centered paragraphs */}
        <div className="text-center space-y-4 pb-[1in]">
          <p className="w-full md:w-6/7 mx-auto font-julius text-lg">
            At Cuisine Louisiane, our commitment to excellence extends beyond the culinary realm. We prioritize exceptional service, ensuring that every guest feels welcomed and pampered throughout the event. From the moment you contact us until the last plate is cleared, our team will be by your side, dedicated to making your vision a reality.
          </p>
          <p className="w-full md:w-6/7 mx-auto font-julius text-lg">
            Elevate your next event with the unparalleled catering services of Cuisine Louisiane. Contact us today to begin crafting an extraordinary experience that will leave a lasting impression on you and your guests.
          </p>
        </div>
      </div>
    </div>
  );
}