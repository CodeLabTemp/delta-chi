import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "../components/ui/button";
import MemberSideBar from "@/components/ui/membersidebar";
import AdminSideBar from "@/components/ui/sidebar";
import { PortalButton } from "@/components/ui/portalbutton";


const AuthLayout = () => {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();
  const [isAdminPortal, setIsAdminPortal] = useState(user?.role === "admin");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen relative">
      {user.role === "admin" && isAdminPortal ? <AdminSideBar /> : <MemberSideBar />}

      <div className="flex-1 flex flex-col transition-all duration-300 p-6">
        
        {/* Admin Portal Button */}
        {user.role === "admin" && (
          <div className="self-end mb-4">
            <PortalButton 
              className="btn bg-[#CA3D31] text-white rounded-none w-40 border-none hover:shadow-lg" 
              onClick={() => setIsAdminPortal(!isAdminPortal)}
            >
              {isAdminPortal ? "Exit Admin Portal" : "Admin Portal"}
            </PortalButton>
          </div>
        )}

        {/* Page Content */}
        <Outlet context={{ isAdminPortal }} />
      </div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
