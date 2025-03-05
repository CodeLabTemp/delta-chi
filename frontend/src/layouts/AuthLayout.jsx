import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import AdminSideBar from "@/components/ui/sidebar";
import MemberSideBar from "@/components/ui/membersidebar";
import { PortalButton } from "@/components/ui/portalbutton";

const AuthLayout = () => {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      setIsAdminView(user.role === "admin"); // Ensure admin sidebar is default for admins
    }
  }, [user]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Outlet />;
  }

  const toggleView = () => {
    if (isAdminView) {
      navigate("/dashboard"); // Switch to member dashboard
    } else {
      navigate("/admin/adminpage"); // Switch to admin page
    }
    setIsAdminView(!isAdminView);
  };

  return (
    <div className="flex h-screen">
      {isAdminView ? <AdminSideBar /> : <MemberSideBar />}

      <div className="flex-1 flex flex-col items-center justify-start p-6">
        
        {/* Admin Portal Button - Only visible to admins */}
        {user.role === "admin" && (
          <div className="self-end mb-4">
            <PortalButton
              className="btn bg-[#CA3D31] text-white rounded-none w-40 border-none hover:shadow-lg"
              onClick={toggleView}
            >
              {isAdminView ? "Member Portal" : "Admin Portal"}
            </PortalButton>
          </div>
        )}

        <Outlet />
      </div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
