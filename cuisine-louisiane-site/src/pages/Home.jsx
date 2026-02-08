import veg5 from "../assets/veg5.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container text-center">
      <img
        src={veg5}
        alt="Cuisine Louisiane"
        className="w-full mx-auto object-cover"
      />

      <div className="mt-8 px-6 md:px-16 lg:px-[2in]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-julius">
            Offsite Catering
          </h2>
          <p className="text-base md:text-xl mt-4 font-julius leading-relaxed">
            We’re ready to help you with any event, from weddings and graduations,
            to family gatherings and game day feasts, to office lunches or corporate
            events. We offer full service onsite & offsite catering for any occasion
            in the greater Baton Rouge area. Big or small, we’re committed to making
            your event absolutely unforgettable. We work closely with you to ensure a
            seamless experience for both you and your guests.
          </p>
        </div>
      </div>

      <div className="mt-10 px-6 md:px-16 lg:px-[2.5in] mb-12">
        <div className="max-w-5xl mx-auto">
          <Link to="/ourvenue" className="hover:text-gray-900">
            <h2 className="text-2xl md:text-3xl font-bold font-julius">
              Events at James Grace House
            </h2>
          </Link>
          <p className="text-base md:text-xl mt-4 font-julius leading-relaxed">
            Our venue, The James Grace House, is set on the grounds of a beautiful
            antebellum home, where history meets romance, and special memories are made.
            This southern splendor at its finest offers an affordable and elegant backdrop
            for your dream wedding, corporate event, or gathering of any size.
          </p>
        </div>
      </div>
    </div>
  );
}