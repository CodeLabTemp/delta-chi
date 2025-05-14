import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import MemberImage from "@/components/MemberImage";
import ImageUploader from "@/components/ImageUploader";

const ProfileEditPage = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [major, setMajor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/profiles/edit`, {
        withCredentials: true,
      });
      const data = response?.data?.profile;
      setProfile(data);
      setBio(data?.bio || "");
      setMajor(data?.major || "");
      setPhoneNumber(formatPhoneNumber(data?.phoneNumber || ""));
      setEmergencyContact(data?.emergencyContact || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 6)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}-${numbersOnly.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.patch(
        `${BASE_URL}/api/profiles/edit`,
        {
          bio,
          major,
          phoneNumber: phoneNumber.replace(/\D/g, ""),
          emergencyContact,
        },
        { withCredentials: true }
      );
      setShowModal(true);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="max-w-lg flex justify-center mx-auto p-6 bg-white shadow-md rounded-lg">
        <span className="loading loading-bars loading-lg text-primary-yellow"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white font-lora">
      <h1 className="text-4xl font-bold mb-4 text-primary-red text-center">My Profile</h1>
      <div className="w-full flex flex-col shadow-md rounded-lg border px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4 text-primary-red">Profile Photo</h1>
        <div className="w-full flex justify-evenly flex-col min-h-40 lg:min-h-10 lg:justify-evenly lg:flex-row">
          <MemberImage />
          <ImageUploader />
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 mt-6">
        <div className="w-full flex flex-col shadow-md rounded-lg border px-4 py-6">
          <h1 className="text-2xl font-semibold mb-4 text-primary-red">Personal Information</h1>
          <div className="flex flex-wrap w-full">
            <div className="w-1/2 py-4 pr-4">
              <p className="font-semibold pb-2">Full Name</p>
              <p>{`${user.firstname} ${user.lastname}`}</p>
            </div>

            <div className="w-1/2 py-4 pr-4">
              <label className="block font-semibold pb-2">Major</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Your major"
              />
            </div>
            
            <div className="w-1/2 py-4 pr-4">
              <label className="block font-semibold pb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="12"
                className="w-full p-2 border rounded"
                placeholder="XXX-XXX-XXXX"
              />
            </div>

            <div className="w-1/2 py-4 pr-4">
              <label className="block font-semibold pb-2">Emergency Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Emergency contact details"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold pb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Write something about yourself..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary-yellow text-white px-4 py-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {showModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Profile Updated</h2>
            <p className="py-4">Your profile has been successfully updated!</p>
            <div className="modal-action">
              <button
                className="btn btn-outline bg-primary-yellow"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProfileEditPage;
