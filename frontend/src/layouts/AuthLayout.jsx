import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const AuthLayout = () => {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

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
    <div className="flex flex-col transition-all duration-300">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AuthLayout;
