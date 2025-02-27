import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const MemberSideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const isModOrAdmin = user.role === "admin" || user.role === "moderator";
  const roleDisplay = user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderator" : "Member";



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false); // Close the menu when switching to desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#F1BD19] z-50 pt-6 transition-transform drop-shadow-[4px_4px_10px_rgba(0,0,0,0.4)] rounded-r-xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:h-screen`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="btn btn-ghost btn-circle absolute top-4 right-4 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="/avatar-jessica.jpeg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#CA3D31]"
          />
          <p className="mt-2 text-lg">
          {" "}
          <span>{user.firstname}</span>
          </p>
          <p className="text-sm text-[#CA3D31]">{roleDisplay}</p>
        </div>

        <hr className="w-full border-t border-white" />

        {/* Sidebar Links */}
        <ul className="w-full text-center space-y-4 mt-4 pb-4">
          <Link className="block py-2 w-full hover:font-bold" to="/dashboard">Dashboard</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/announcements">Announcements</Link>          
          <Link className="block py-2 w-full hover:font-bold" to="/events">Events</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/profile/edit">Calendar</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/profile/edit">Omega Fi</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/profile/edit">Member Directory</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/profile/edit">Settings</Link>


        </ul>

        <hr className="w-full border-t border-white mt-4" />

        <div className="flex items-center justify-center">
            {<button onClick={logout} className="btn bg-[#11375C] hover:bg-[#11375C] text-white font-semibold mt-8 rounded-none w-40 border-none hover:shadow-lg">
              Log Out
            </button>}
        </div>
      </div>

      {/* Hamburger Icon (Only Visible When Sidebar is Closed) */}
      {!isMenuOpen && (
        <div className="fixed top-4 left-4 sm:hidden z-50">
          <button className="btn btn-ghost btn-circle" onClick={() => setIsMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberSideBar;
