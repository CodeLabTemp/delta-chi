import { useNavigate } from "react-router-dom";
import DashboardAnnouncements from "@/components/DashboardAnnouncements";
import AdminDashboard from "@/components/admin/admindashboard";
import { useAuthStore } from "@/store/authStore";
import { PortalButton } from "@/components/ui/portalbutton";
import AdminSideBar from "@/components/ui/sidebar";

const AdminPage = () => {
  const { user, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <AdminSideBar />

      <div className="flex-1 flex flex-col items-center justify-start p-6">
        {/* Admin Portal Button */}
        <div className="self-end mb-4">
          {user.role === "admin" && (
            <PortalButton 
              className="btn bg-[#CA3D31] text-white rounded-none w-40 border-none hover:shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Member Portal
            </PortalButton>
          )}
        </div>

        <DashboardAnnouncements />

        <h1 className="text-3xl font-bold text-gray-800 mt-8">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Welcome, <span className="font-semibold text-gray-900">{user.firstname}</span>!
        </p>
        
        <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
