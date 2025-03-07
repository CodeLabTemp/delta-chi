const AdminDashboard = () => {
  return (
    <div className="flex flex-1 p-4 sm:p-6 flex-col items-center w-full">
      
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="bg-[#F1BD19] p-4 sm:p-6 w-full h-48 sm:h-64 flex flex-col justify-between items-center 
          rounded-none lg:rounded-l-2xl lg:rounded-r-none">
          <h3 className="text-sm sm:text-lg mt-1 sm:mt-2 pl-2">Total Members</h3>
          <p className="text-[#CA3D31] text-5xl sm:text-7xl font-bold font-merriweather">30</p>
          <div className="flex items-center gap-1 pb-1 sm:pb-2 text-green-600">
            <span className="text-xs sm:text-sm font-semibold">6 (25%)</span>
            <span className="text-lg">▲</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F1BD19] p-4 sm:p-6 w-full h-48 sm:h-64 flex flex-col justify-between items-center rounded-none">
          <h3 className="text-sm sm:text-lg mt-1 sm:mt-2 pl-2">Pending Requests</h3>
          <p className="text-[#CA3D31] text-5xl sm:text-7xl font-bold font-merriweather">8</p>
          <div className="flex items-center gap-1 pb-1 sm:pb-2 text-green-600">
            <span className="text-xs sm:text-sm font-semibold">6 (25%)</span>
            <span className="text-lg">▲</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F1BD19] p-4 sm:p-6 w-full h-48 sm:h-64 flex flex-col justify-between items-center rounded-none">
          <h3 className="text-sm sm:text-lg mt-1 sm:mt-2 pl-2">Announcements</h3>
          <p className="text-[#CA3D31] text-5xl sm:text-7xl font-bold font-merriweather">29</p>
          <div className="flex items-center gap-1 pb-1 sm:pb-2 text-red-600">
            <span className="text-xs sm:text-sm font-semibold">6 (25%)</span>
            <span className="text-lg">▼</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#F1BD19] p-4 sm:p-6 w-full h-48 sm:h-64 flex flex-col justify-between items-center 
          rounded-none lg:rounded-r-2xl lg:rounded-l-none">
          <h3 className="text-sm sm:text-lg mt-1 sm:mt-2 pl-2">Total Events</h3>
          <p className="text-[#CA3D31] text-5xl sm:text-7xl font-bold font-merriweather">9</p>
          <div className="flex items-center gap-1 pb-1 sm:pb-2 text-green-600">
            <span className="text-xs sm:text-sm font-semibold">6 (25%)</span>
            <span className="text-lg">▲</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
