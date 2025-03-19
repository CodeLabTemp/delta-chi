import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useAuthStore } from "@/store/authStore";

const CurrentMembers = () => {
  const [currentMembers, setCurrentMembers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const { user } = useAuthStore();

  const fetchData = async () => {
    try {
      // Fetch current members
      const membersResponse = await axios.get(
        `${BASE_URL}/api/admin/current-members`,
        { withCredentials: true }
      );

      // Fetch profiles
      const profilesResponse = await axios.get(
        `${BASE_URL}/api/profiles`,
        { withCredentials: true }
      );

      const members = membersResponse?.data?.currentMembers || [];
      const profilesData = profilesResponse?.data?.activeMembers || [];

      // Merge profile data with current members
      const mergedData = members.map((member) => {
        const profile = profilesData.find((p) => p._id === member._id);
        return profile ? { ...member, profileImage: profile.profileImage } : member;
      });

      setCurrentMembers(mergedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/update-role`,
        { userIdToUpdate: id, newRole },
        { withCredentials: true }
      );

      setCurrentMembers((members) =>
        members.map((member) =>
          member._id === id ? { ...member, role: newRole } : member
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 text-[#333333]">
      <h2 className="text-2xl font-bold mb-4 text-white">Current Members</h2>
      {currentMembers?.length === 0 ? (
        <div>There are no current members</div>
      ) : (
        <div className="w-full">
          <div className="min-[1000px]:block hidden">
            <div className="grid grid-cols-4 font-bold py-2 border-b text-center">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Action</span>
            </div>
          </div>
          {currentMembers?.map((member) => (
            <div
              key={member._id}
              className="grid grid-cols-4 items-center border-b py-4 text-center"
            >
              <div className="flex justify-center items-center gap-4">
                {member.profileImage?.url ? (
                  <img
                    src={member.profileImage.url}
                    alt={`${member.firstname} ${member.lastname}`}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                    {member.firstname?.charAt(0)}
                    {member.lastname?.charAt(0)}
                  </div>
                )}

                <span className="font-medium text-black">
                  {member.firstname} {member.lastname}
                </span>
              </div>

              <span className="block max-[1000px]:block min-[1000px]:hidden">
                {member.email}
              </span>
              <div className="hidden min-[1000px]:block">{member.email}</div>

              <div className="relative flex justify-center w-full">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 w-full max-w-[140px] mx-auto rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === member._id ? null : member._id
                      )
                    }
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    <svg
                      className="-mr-1 size-5 text-[#11375C]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {dropdownOpen === member._id && (
                  <div
                    className="absolute right-0 top-full mt-1 w-56 rounded-md bg-white z-10 border border-[#11375C]"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => updateRole(member._id, "member")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      >
                        Member
                      </button>
                      <button
                        onClick={() => updateRole(member._id, "admin")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => updateRole(member._id, "banned")}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      >
                        Banned
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => updateRole(member._id, member.role)}
                className="bg-white text-[#11375C] font-bold px-3 py-1 cursor-pointer"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentMembers;
