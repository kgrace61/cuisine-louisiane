export default function Menus() {
  const menus = [
    { title: "Wedding Menu", file: "/menus/wedding.pdf" },
    { title: "Corporate Catering", file: "/menus/corporate.pdf" },
    { title: "Holiday / Seasonal", file: "/menus/holiday.pdf" },
  ];

  return (
    <div className="px-6 md:px-[2in] pt-[1in] pb-[1in] font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-semibold font-pinyon text-maroon">
          Menus
        </h1>

        <p className="mt-6 text-center font-julius text-lg md:text-xl leading-relaxed">
          Download our current menus below. Offerings may vary by season and availability.
          <br />
          For pricing and custom quotes, please{" "}
          <span className="text-maroon">contact us</span>.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {menus.map((m) => (
            <a
              key={m.title}
              href={m.file}
              target="_blank"
              rel="noreferrer"
              className="group block border border-gray-200 bg-white rounded-md p-6 transition hover:shadow-md"
            >
              <div className="font-julius text-xl text-black group-hover:text-gray-900">
                {m.title}
              </div>
              <div className="mt-2 font-julius text-sm tracking-wide text-maroon">
                DOWNLOAD PDF →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center font-julius text-base md:text-lg">
          Looking for something specific? We’re happy to tailor menus for weddings,
          corporate events, parties, and private dinners.
        </div>
      </div>
    </div>
  );
}
