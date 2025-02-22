import DashboardAnnouncements from "@/components/DashboardAnnouncements";
import EventCalendar from "@/components/EventCalendar";
import EventsDashboard from "@/components/admin/admineventdashboard";
import PendingRequests from "@/components/admin/adminpendingrequests";
import QuickActions from "@/components/admin/adminquickaction";
import { useAuthStore } from "@/store/authStore";

const DashboardPage = () => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-white">
      
      
      <h1 className="text-3xl font-bold text-gray-800 mt-8">Dashboard</h1>
      <p className="mb-8 text-primary-red font-bold text-[32px] font-lora leading-[41px]">
        Welcome,{" "}
        <span className="text-primary-red font-bold text-[32px] font-lora leading-[41px]">{user.firstname}</span>!
      </p>
      <DashboardAnnouncements />
      <EventsDashboard />
      <PendingRequests />
      <QuickActions />
      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <EventCalendar />
      </div>
    </div>
  );
};

export default DashboardPage;
