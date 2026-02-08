import React from "react";
import JG1 from "../assets/JG1.png";

export default function OurVenue() {
  return (
    <div className="px-6 md:px-16 lg:px-[2in] pt-8 md:pt-[1in] pb-12 font-julius">
      <div className="flex flex-col space-y-10 max-w-6xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-semibold font-pinyon text-maroon">
          Our Venue
        </h1>

        {/* Top Section: Image on the left, text on the right */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={JG1}
            alt="James Grace House venue"
            className="w-full md:w-3/5 h-auto rounded-md"
          />
          <p className="text-center md:text-left md:w-2/5 text-base md:text-lg leading-relaxed">
            The James Grace House seamlessly combines the charm of the past with modern
            amenities. The beautifully redone barn, constructed from cypress wood, provides
            a rustic yet sophisticated ambiance. On the grounds, you'll find a fully equipped
            bar, convenient restrooms, and a dedicated bride's suite—ensuring a comfortable
            and memorable experience for you and your guests.
          </p>
        </div>

        {/* Bottom Section: Three paragraphs with titles */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-pinyon text-maroon">
              A Legacy of Love and Hospitality
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              The idea of transforming this property into a full-fledged wedding venue was
              born from the Grace family's love for hosting celebrations. Jimmy and Dianne
              Grace hosted their four daughters' weddings on these very grounds, creating
              cherished memories that inspired them to share this special place with others.
            </p>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-pinyon text-maroon">
              Convenient Location, Unparalleled Beauty
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Conveniently located just a short drive from Baton Rouge, the James Grace House
              offers a serene escape from the hustle and bustle of city life. The picturesque
              antebellum home and meticulously manicured grounds provide a breathtaking backdrop
              for your event, ensuring that every moment is captured in timeless elegance.
            </p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-base md:text-lg leading-relaxed">
              Whether you envision a romantic outdoor ceremony, a lavish reception under the
              stars, or a corporate gathering with a touch of southern hospitality, the James
              Grace House stands ready to make your dreams a reality. Book your event today and
              let us create an unforgettable experience that will be cherished for years to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}