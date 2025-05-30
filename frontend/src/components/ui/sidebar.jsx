import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import MemberImage from "@/components/MemberImage";


const AdminSideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const roleDisplay = user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderator" : "Member";


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsMenuOpen(false); // Auto-close sidebar when resizing to larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#F1BD19] text-black z-50 pt-6 transition-transform drop-shadow-lg rounded-r-xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        <button className="btn btn-ghost btn-circle absolute top-4 right-4 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          ✕
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#CA3D31] bg-white"
            />
          ) : (
            <MemberImage />
          )}
          <p className="mt-2 text-lg">{user.firstname}</p>
          <p className="text-sm text-[#CA3D31] font-semibold">{roleDisplay}</p>
        </div>
        
        <hr className="w-full border-t border-white" />

        {/* Sidebar Links */}
        <ul className="w-full text-center space-y-4 mt-4 pb-4">
          <Link className="block py-2 w-full hover:font-bold" to="/admin/adminpage">Dashboard</Link>
          <Link className="block py-2 w-full hover:font-bold" to="/profiles">Members</Link>
          <Link className="block py-2 w-full hover:font-bold" to="admin/permissions">Permissions</Link>
          <Link className="block py-2 w-full hover:font-bold" to="admin/announcements">Announcements</Link>
          <Link className="block py-2 w-full hover:font-bold" to="admin/events">Events</Link>
          <Link className="block py-2 w-full hover:font-bold" to="admin/messages">Messages</Link>                    
          <Link className="block py-2 w-full hover:font-bold" to="/profile/edit">Edit My Profile</Link>
        </ul>
        <hr className="w-full border-t border-white mt-4" />

        <div className="flex items-center justify-center">
          <button onClick={logout} className="btn bg-[#11375C] hover:bg-[#11375C] text-white font-semibold mt-8 rounded-none w-40 border-none hover:shadow-lg">
            Log Out
          </button>
        </div>
      </div>

      {/* Hamburger Icon*/}
      {!isMenuOpen && (
        <div className="fixed top-4 left-4 lg:hidden z-50">
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

export default AdminSideBar;
