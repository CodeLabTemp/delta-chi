import DashboardAnnouncements from "@/components/DashboardAnnouncements";
import EventCalendar from "@/components/EventCalendar";
import { useAuthStore } from "@/store/authStore";
import AdminDashboard from "@/components/admin/admindashboard";
import { useOutletContext } from "react-router-dom";

const DashboardPage = () => {
  const { user, isCheckingAuth } = useAuthStore();
  const { isAdminPortal } = useOutletContext(); // Get state from AuthLayout

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <DashboardAnnouncements />
      <h1 className="text-3xl font-bold text-gray-800 mt-8">
        {isAdminPortal ? "Admin Portal" : "Dashboard"}
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Welcome,{" "}
        <span className="font-semibold text-gray-900">{user.firstname}</span>!
      </p>
      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg">
        {isAdminPortal ? <AdminDashboard /> : <EventCalendar />}
      </div>
    </div>
  );
};

export default DashboardPage;
