import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const PublicNavbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); // Close the menu when switching to desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="relative z-50 bg-base-100">
    <div className="navbar px-4 md:px-6 py-7 w-full overflow-x-hidden flex justify-between">
      {/* (Mobile/Tablet View) */}
      <div className="w-auto lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Logo Section */}
      <div className="w-auto max-[330px]:hidden">
        <div className="flex items-center space-x-3 sm:space-x-2">
          <img
            src="/deltachilogo.png"
            alt="Logo"
            className="h-15 w-10 max-sm:h-7 max-sm:w-5"
          />
          <div className="flex flex-col text-center leading-none whitespace-nowrap">
            <span className="text-xl font-merriweather font-extrabold text-[#CA3D31] max-sm:text-sm">
              DELTA CHI
            </span>
            <span className="text-sm font-lora font-medium text-gray-600 max-sm:text-xs">
              CSU East Bay
            </span>
          </div>
        </div>
      </div>

      {/* Navbar Center (Desktop View) */}
      <div className="navbar-center hidden lg:flex ml-4">
        <ul className="menu menu-horizontal items-center justify-center">
          <li>
            <Link
              to="/"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/page1"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              Membership
            </Link>
          </li>
          <li>
            <Link
              to="/page2"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/page1"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              Alumni
            </Link>
          </li>
          <li>
            <Link
              to="/page2"
              className="font-montserrat font-semibold text-black text-base px-4 py-2"
            >
              Donate
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="w-auto lg:justify-end lg:pr-4">
        <Link to="/login">
        <button
          className="btn bg-[#F1BD19] text-black font-montserrat font-semibold px-5 py-2 rounded-none 
           hover:bg-[#F1BD19] hover:shadow-[0_2px_4px_rgba(0,0,0,0.7)] border-none"
        >
          My DChi
        </button>
        </Link>
      </div>
    </div>

    {/* Mobile/Tablet Menu */}
    {isMenuOpen && (
      <div className="absolute top-full left-0 w-full max-w-[300px] max-sm:max-w-full bg-white shadow-lg z-40 p-4 overflow-hidden">
        <ul className="menu menu-vertical space-y-1 whitespace-normal break-words">
          <li>
            <Link
              to="/"
              className="font-montserrat font-semibold text-black text-base"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/page1"
              className="font-montserrat font-semibold text-black text-base"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/page2"
              className="font-montserrat font-semibold text-black text-base"
            >
              Membership
            </Link>
          </li>
          <li>
            <Link
              to="/page1"
              className="font-montserrat font-semibold text-black text-base"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/page2"
              className="font-montserrat font-semibold text-black text-base"
            >
              Alumni
            </Link>
          </li>
          <li>
            <Link
              to="/page1"
              className="font-montserrat font-semibold text-black text-base"
            >
              Donate
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>

  );
};

export default PublicNavbar;
