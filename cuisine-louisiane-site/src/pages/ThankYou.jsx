import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-[2in] py-16 font-julius">
      <div className="max-w-3xl mx-auto text-center bg-white border rounded-lg p-10">
        <h1 className="text-4xl md:text-5xl font-pinyon text-maroon">Thank you</h1>
        <p className="mt-4 text-base md:text-lg">
          Your message has been received. We’ll be in touch soon.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 bg-maroon text-white px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}