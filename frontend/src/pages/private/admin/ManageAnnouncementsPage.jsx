import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageAnnouncements = () => {
  const { user } = useAuthStore();
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(
          `${BASE_URL}/api/announcements/${editingId}`,
          { title, content, isPinned },
          { withCredentials: true }
        );
        setEditingId(null);
      } else {
        await axios.post(
          `${BASE_URL}/api/announcements`,
          { title, content, isPinned },
          { withCredentials: true }
        );
      }
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(`${BASE_URL}/api/announcements/${id}`, {
          withCredentials: true,
        });
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  const handleEdit = (announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setIsPinned(announcement.isPinned);
    setEditingId(announcement._id);
  };

  const togglePin = async (id, currentStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/announcements/${id}`,
        { isPinned: !currentStatus },
        { withCredentials: true }
      );
      fetchAnnouncements();
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setIsPinned(false);
    setEditingId(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-merriweather text-[#CA3D31]">Manage Announcements</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-8">
          <label className="block mb-2 font-bold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter announcement title"
            className="w-full h-14 p-3 border bg-[#F5F5DC] rounded-lg"
          />
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-bold">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement content"
            className="w-full h-32 p-3 border bg-[#F5F5DC] rounded-lg"
          ></textarea>
        </div>
        <div className="mb-8">
          <label className="flex items-center font-bold">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="mr-2"
            />
            Pin Announcement
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="w-[48%] bg-[#F1BD19] text-black font-bold px-4 py-2 border hover:opacity-80 transition disabled:opacity-50"
          >
            {editingId ? "Update Announcement" : "Create Announcement"}
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

      <h2 className="text-xl font-bold mb-6">All Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="border p-4">
            <h3 className="font-bold">{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p className="text-sm text-gray-600">
              {announcement.isPinned ? "📌 Pinned" : "\u00A0"}
            </p>
            <button
              onClick={() => handleEdit(announcement)}
              className="bg-green-500 text-white px-2 py-1 mt-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => togglePin(announcement._id, announcement.isPinned)}
              className="bg-yellow-500 text-white px-2 py-1 mt-2 mr-2"
            >
              {announcement.isPinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => handleDelete(announcement._id)}
              className="bg-red-500 text-white px-2 py-1 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
