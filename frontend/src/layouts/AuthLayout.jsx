import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "../components/ui/button";
import PrivateNavbar from "@/components/PrivateNavbar";
import AdminDashboard from "@/components/admin/admindashboard";
import { Sidebar } from "lucide-react";
import MemberSideBar from "@/components/ui/sidebar";

const AuthLayout = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user, logout } =
    useAuthStore();

  useEffect(() => {
    // console.log("AuthLayout.jsx useEffect() fired");
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* {user && <Button onClick={logout}>Logout</Button>} */}
      {/* {user && <PrivateNavbar logout={logout} />} */}
      {/*user && <PrivateNavbar />*/}
        {user && <MemberSideBar/>}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {user && <AdminDashboard />}
      </div>
      <Outlet />
      {/*<Toaster />*/}
    </div>
  );
};

export default AuthLayout;
