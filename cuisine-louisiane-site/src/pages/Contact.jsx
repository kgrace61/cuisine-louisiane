import React from "react";
import gallery34 from "../assets/gallery/gallery34.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 md:px-16 lg:px-[2in] font-julius">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-center text-4xl md:text-5xl font-semibold font-pinyon text-maroon">
          Contact Us
        </h1>
        <p className="text-center text-base md:text-lg mt-3 mb-10">
          Tell us a little about your event and we’ll follow up with availability and next steps.
        </p>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left: Form */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/thank-you"
              className="space-y-5"
            >
              {/* Netlify required hidden fields */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              {/* Name / Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-1">Phone (optional)</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(225) 555-1234"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                />
              </div>

              {/* Event details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1">Event date (optional)</label>
                  <input
                    name="event_date"
                    type="date"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Guest count (optional)</label>
                  <input
                    name="guest_count"
                    type="text"
                    placeholder="Approx. number of guests"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Event location (optional)</label>
                <input
                  name="event_location"
                  type="text"
                  placeholder="Baton Rouge / Plaquemine / On-site at James Grace House, etc."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us what you’re planning (wedding, corporate, private dinner, etc.) and any menu notes or preferences."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-maroon/40"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-maroon text-white py-3 text-base tracking-wide hover:opacity-90 transition"
              >
                Send Message
              </button>

              <p className="text-sm text-center opacity-70">
                Prefer to call?{" "}
                <a className="text-maroon hover:underline" href="tel:12257760891">
                  (225) 776-0891
                </a>{" "}
                •{" "}
                <a className="text-maroon hover:underline" href="mailto:cuisinelouisiane@hotmail.com">
                  cuisinelouisiane@hotmail.com
                </a>
              </p>
            </form>
          </div>

          {/* Right: Image + small blurb */}
          <div className="space-y-4">
            <img
              src={gallery34}
              alt="James Grace House"
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="font-pinyon text-2xl text-maroon text-center">
                The James Grace House
              </h2>
              <p className="mt-2 text-center text-sm md:text-base leading-relaxed">
                Offsite catering throughout the Greater Baton Rouge area, or host your event
                on-site for a beautiful Southern venue experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
