import DashboardAnnouncements from "@/components/DashboardAnnouncements";
import EventCalendar from "@/components/EventCalendar";
import { useAuthStore } from "@/store/authStore";
import EventsDashboard from "@/components/admin/admineventdashboard";
import PendingRequests from "@/components/admin/adminpendingrequests";
import QuickActions from "@/components/admin/adminquickaction";
import { useAuthStore } from "@/store/authStore";

const DashboardPage = () => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start p-6">
      <p className="text-[#CA3D31] mt-2 font-merriweather font-bold text-3xl sm:text-4xl">
        Welcome, <span>{user.firstname}</span>!
      </p>

      <DashboardAnnouncements />

      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg">
        <EventsDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
