import gallery34 from "../assets/gallery/gallery34.png";

export default function Contact() {
  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-[2in] py-10">
      <div className="max-w-4xl mx-auto text-center font-julius">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6"></h1>

        <p className="text-lg md:text-2xl mb-2">
            <br></br>
          Contact us for a quote or with any questions.
        </p>

        <p className="text-lg md:text-2xl mt-4">
          Chef Tiger Grace:{" "}
          <a className="text-maroon hover:underline" href="tel:12257760891">
            (225) 776-0891
          </a>
        </p>

        <p className="text-lg md:text-2xl mt-2">
          Email:{" "}
          <a
            className="text-maroon hover:underline break-words"
            href="mailto:cuisinelouisiane@hotmail.com"
          >
            cuisinelouisiane@hotmail.com
          </a>
        </p>

        <div className="mt-10">
          <img
            src={gallery34}
            alt="James Grace House"
            className="w-full max-w-3xl mx-auto h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
}