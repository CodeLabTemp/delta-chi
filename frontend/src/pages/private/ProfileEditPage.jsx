import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import MemberImage from "@/components/MemberImage"
const ProfileEditPage = () => {
  const {uploadProfileImg,user} = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [major, setMajor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setImgLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileChanged,setFileChanged] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(null);
  
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

      // Storing original values
      setOriginalProfile({  
        bio: data?.bio || "",
        major: data?.major || "",
        phoneNumber: formatPhoneNumber(data?.phoneNumber || ""),
        emergencyContact: data?.emergencyContact || "",
      });
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
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(
      3,
      6
    )}-${numbersOnly.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setFile(file);
      setFileChanged(true);
    }
  };

  const handleImageChange =async ()=>{
    if(!file){
      setFileChanged(false);
    }
    if(file){
      const formData = new FormData();
      formData.append("image", file);
      setImgLoading(true);
      
      await uploadProfileImg(formData);
    }
    setImgLoading(false);
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
      setIsValidNumber(true);
      fetchProfile();
    } catch (error) {
      setIsValidNumber(false);
      console.error("Error updating profile:", error);
    }finally{
      setIsLoading(false);
    }
  };
  const hasChanged = () => {
    if (!originalProfile) return false;

    return (
      bio !== originalProfile?.bio ||
      major !== originalProfile?.major ||
      phoneNumber !== formatPhoneNumber(originalProfile?.phoneNumber) ||
      emergencyContact !== originalProfile?.emergencyContact
    );
  };


  return (
    
    <>
    
    {isLoading || !profile &&
      <div className="max-w-lg max-h-[500px] flex justify-center mx-auto p-6 bg-white shadow-md rounded-lg">
        <span className="loading loading-bars loading-lg text-primary-yellow"></span>
      </div>
    }
    
    {!showModal &&
      <div className="max-w-2xl mx-auto p-6 bg-white font-lora">
      <h1 className="text-4xl font-bold mb-4 text-primary-red text-center">My Profile</h1>
      <div className=" w-full flex flex-col shadow-md rounded-lg border px-4 py-6">
          <h1 className="text-2xl font-semibold mb-4 text-primary-red">Profile Photo</h1>
          <div className="w-full flex justify-center flex-col lg:justify-evenly lg:flex-row items-center ">
            <MemberImage/>
            {/* upload image */}
            <div className="w-full flex justify-evenly flex-col min-h-40 lg:min-h-10 lg:justify-evenly lg:flex-row">
              <input 
                type="file" 
                accept="image/*"  
                id="fileInput"
                className="file-input max-w-xs file-input-bordered"
                onChange={handleFileChange} 
              ></input>
              <button
                onClick={handleImageChange}
                disabled={loading}
                className="bg-primary-yellow text-white px-3 py-2 "
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </div>
          {!fileChanged && <p className="text-primary-red text-center">Upload a file</p>}
          
        </div>
      <div className="w-full flex flex-col my-10">
        {/* setting they cannot change */}
        <form onSubmit={handleUpdate} className="space-y-4">
        <div className="w-full flex flex-col shadow-md rounded-lg border px-4 py-6">
          <h1 className="text-2xl font-semibold mb-4 text-primary-red">Personal Information</h1>
          <div className="flex flex-wrap w-full">
            <div id="fullname" className="w-1/2 py-4 pr-4">
              <p className="font-semibold pb-2">Full Name</p>
              <p>{`${user.firstname } ${user.lastname}`}</p>
            </div>
            

            <div id="major" className="w-1/2 py-4 pr-4">
              <label className="block font-semibold pb-2">Major</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Your major"
              />
            </div>
            <div id="phoneNumbere" className="w-1/2 py-4 pr-4">
              <label className="block font-semibold pb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="12"
                className="w-full p-2 border rounded"
                placeholder="XXX-XXX-XXXX"
                required
              />
              {!isValidNumber && <h1 className="text-[red]">Enter a valid number</h1>}
            </div>

            <div id="emergencyContact" className="w-1/2 py-4 pr-4">
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
          <div id="bio">
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
              className="bg-primary-yellow text-white px-4 py-2 rounded"
              disabled={!hasChanged()} 
            >
              Save Changes
            </button>
        </div>
        </form>
      </div>
      </div>
    }

    {showModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Profile Updated</h2>
            <p className="py-4">Your profile has been successfully updated!</p>
            <div className="modal-action">
              <button
                className="btn  btn-outline bg-primary-yellow"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProfileEditPage;
