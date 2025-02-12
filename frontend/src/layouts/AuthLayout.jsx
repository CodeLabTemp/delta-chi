import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "../components/ui/button";
import PrivateNavbar from "@/components/PrivateNavbar";
import AdminDashboard from "@/components/admin/admindashboard";
import { Sidebar } from "lucide-react";
import MemberSideBar from "@/components/ui/sidebar";
import { PortalButton } from "@/components/ui/portalbutton";

const AuthLayout = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user, logout } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <div className="flex h-screen relative">
          <MemberSideBar />

          <div className="flex-1 flex flex-col transition-all duration-300 p-6">
            <div className="self-start mb-4"></div>

            <div className="self-end mb-4">
              <PortalButton className="px-6 py-2 text-white">
                Admin Portal
              </PortalButton>
            </div>

            <AdminDashboard />
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default AuthLayout;
