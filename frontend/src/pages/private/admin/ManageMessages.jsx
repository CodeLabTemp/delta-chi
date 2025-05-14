import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const ManageMessages = () => {
  const { user } = useAuthStore();
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const dropdownRef = useRef(null);

  const groupRecipients = ["All", "Admin Only", "President Only"];
  const individualRecipients = ["John Doe", "Jane Smith", "Alice Johnson"];

  useEffect(() => {
    fetchAnnouncements();

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/announcements`, {
        withCredentials: true,
      });
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const removeAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);

    // Reset file input if no files remain
    if (updatedAttachments.length === 0) {
      setFileInputKey(Date.now());
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleRecipientSelect = (option) => {
    setSelectedRecipients((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("isPinned", isPinned);
      formData.append("recipients", JSON.stringify(selectedRecipients));
      attachments.forEach((file) => formData.append("attachments", file));

      if (editingId) {
        await axios.patch(`${BASE_URL}/api/announcements/${editingId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/api/announcements`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setIsPinned(false);
    setEditingId(null);
    setAttachments([]);
    setSelectedRecipients([]);
    setFileInputKey(Date.now());
  };

  const filteredRecipients = [...groupRecipients, ...individualRecipients].filter((recipient) =>
    recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-merriweather text-[#CA3D31]">
        Manage Messages
      </h1>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Recipient Dropdown */}
        <div className="mb-8 relative" ref={dropdownRef}>
          <label className="block mb-2 font-bold">Recipient</label>
          <input
            type="text"
            readOnly
            value={selectedRecipients.join(", ")}
            onClick={toggleDropdown}
            placeholder="Select recipients"
            className="w-full h-14 p-3 border bg-[#F5F5DC] rounded-lg cursor-pointer"
          />
          {showDropdown && (
            <div className="absolute w-full bg-white border shadow-lg rounded-lg mt-1 z-10 p-2 max-h-64 overflow-y-auto">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search for a recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 mb-2"
              />

              {/* Group Section */}
              <div className="font-bold text-gray-700 px-4 py-1">Groups</div>
              {filteredRecipients
                .filter((option) => groupRecipients.includes(option))
                .map((option) => (
                  <label key={option} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 border border-[#F1BD19] appearance-none h-5 w-5 checked:bg-[#F1BD19] checked:border-[#F1BD19] cursor-pointer"
                      checked={selectedRecipients.includes(option)}
                      onChange={() => handleRecipientSelect(option)}
                    />
                    {option}
                  </label>
                ))}

              {/* Individuals Section */}
              <div className="font-bold text-gray-700 px-4 py-1 mt-2">Individuals</div>
              {filteredRecipients
                .filter((option) => individualRecipients.includes(option))
                .map((option) => (
                  <label key={option} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 border border-[#F1BD19] appearance-none h-5 w-5 checked:bg-[#F1BD19] checked:border-[#F1BD19] cursor-pointer"
                      checked={selectedRecipients.includes(option)}
                      onChange={() => handleRecipientSelect(option)}
                    />
                    {option}
                  </label>
                ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="mb-8">
          <label className="block mb-2 font-bold">Message</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement content"
            className="w-full h-32 p-3 border bg-[#F5F5DC] rounded-lg"
          ></textarea>
        </div>

        {/* Attachments */}
        <div className="mb-8">
          <label className="block mb-2 font-bold">Upload Attachments</label>
          <input
            key={fileInputKey}
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border bg-[#F5F5DC] rounded-lg"
          />
          {attachments.length > 0 && (
            <ul className="mt-2">
              {attachments.map((file, index) => (
                <li key={index} className="text-sm text-gray-700 flex justify-between">
                  {file.name}
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => removeAttachment(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-[48%] bg-[#F1BD19] text-black font-bold px-4 py-2 border hover:opacity-80 transition disabled:opacity-50"
          >
            Send Message
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="w-[48%] bg-white text-[#11375C] border border-[#11375C] px-4 py-2 hover:bg-[#11375C] hover:text-white transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageMessages;
