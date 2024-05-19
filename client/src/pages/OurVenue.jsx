import React from 'react';
import JG1 from '../assets/JG1.png'; // Adjust the path as necessary

export default function OurVenue() {
  return (
    <div className="px-[2in] pt-[1in] font-julius">
      <div className="flex flex-col space-y-8">
        {/* Top Section: Image on the left, text on the right */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img src={JG1} alt="Venue Image" className="w-full md:w-3/5 h-auto" />
          <p className="text-center md:w-2/7 text-lg">
          The James Grace House seamlessly combines the charm of the past with modern amenities. The beautifully redone barn, constructed from cypress wood, provides a rustic yet sophisticated ambiance. on the grounds, you'll find a fully equipped bar, convenient restrooms, and a dedicated bride's suite, ensuring a comfortable and memorable experience for you and your guests.
          </p>
        </div>

        {/* Bottom Section: Three paragraphs with titles */}
        <div className="space-y-8">
          {/* First Paragraph with Title */}
          <div className="text-center space-y-2">
            <h2 className="text-xl">A Legacy of Love and Hospitality</h2>
            <p className="text-lg">
            The idea of transforming this property into a full-fledged wedding venue was born from the Grace family's love for hosting celebrations. Jimmy and Dianne Grace hosted their four daughters' weddings on these very grounds, creating cherished memories that inspired them to share this special place with others.
            </p>
          </div>

          {/* Second Paragraph with Title */}
          <div className="text-center space-y-2">
            <h2 className="text-xl">Convenient Location, Unparalleled Beauty</h2>
            <p className="text-lg">
            Conveniently located just a short drive from Baton Rouge, the James Grace House offers a serene escape from the hustle and bustle of city life. The picturesque antebellum home and meticulously manicured grounds provide a breathtaking backdrop for your event, ensuring that every moment is captured in timeless elegance.
            </p>
          </div>

          {/* Third Paragraph */}
          <div className="text-center space-y-2 pb-[1in]">
            <p className="text-lg">
            Whether you envision a romantic outdoor ceremony, a lavish reception under the stars, or a corporate gathering with a touch of southern hospitality, the James Grace House stands ready to make your dreams a reality. Book your event today and let us create an unforgettable experience that will be cherished for years to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}