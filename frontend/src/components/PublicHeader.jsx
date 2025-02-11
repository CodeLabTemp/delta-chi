import { Link } from "react-router-dom";


export default function PublicHeader() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 space-y-6">
      {/* Background Image with Brightness Filter */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: "url('/headerphoto.jpg')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h1 className="text-[#F1BD19] text-5xl max-sm:text-2xl font-bold font-merriweather max-sm:px-2 sm:px-4 max-w-[450px] w-full mx-auto leading-tight break-words">
          BROTHERHOOD OF A LIFETIME
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg font-normal max-sm:text-sm px-4 max-sm:px-2 max-w-[500px] w-full mx-auto leading-relaxed break-words">
          Delta Chi is built on its core values of promoting friendship, developing
          character, advancing justice, and assisting in the acquisition of a sound
          education.
        </p>

        {/* Join Us Button */}
        <Link to="/signup">
        <button
          className="btn bg-[#F1BD19] text-black font-montserrat font-semibold px-6 py-3 rounded-none mt-6
          hover:bg-[#F1BD19] hover:shadow-[0_2px_4px_rgba(0,0,0,0.7)] border-none"
        >
          Join Us
        </button>
        </Link>
      </div>
    </div>
  );
}
