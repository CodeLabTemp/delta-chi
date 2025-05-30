import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import RSVPList from "@/components/admin/manage-events/RSVPList";
import EventImageUploader from "@/components/admin/EventImageUploader";

const DEFAULT_IMAGE = "/event.jpg";

const ManageEvent = () => {
  const { user } = useAuthStore();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [rsvps, setRsvps] = useState([]);

  const [eventImageId, setEventImageId] = useState(null);
  const [eventImageUrl, setEventImageUrl] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/events/${eventId}`, {
        withCredentials: true,
      });
      const data = response.data.event;

      setEvent(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setStartDate(data.startDate ? new Date(data.startDate) : new Date());
      setEndDate(data.endDate ? new Date(data.endDate) : new Date());
      setLocation(data.location || "");
      setRsvps(Array.isArray(data.userRSVPs) ? data.userRSVPs : []);

      if (data.image) {
        setEventImageId(data.image._id);
        setEventImageUrl(data.image.url);
      } else {
        setEventImageId(null);
        setEventImageUrl(DEFAULT_IMAGE);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${BASE_URL}/api/events/${eventId}`,
        {
          title,
          description,
          startDate,
          endDate,
          location,
          eventImageId,
        },
        { withCredentials: true }
      );
      alert("Event updated successfully!");
      fetchEvent();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      {event ? (
        <form onSubmit={handleUpdate} className="mb-8">
          {/* Event Image Uploader */}
          <EventImageUploader
            onImageSelect={setEventImageId}
            autoSelectFirst={false}
            existingImageId={eventImageId}
          />

          {/* Title */}
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block mb-2">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={startDate}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-2">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Event
          </button>
        </form>
      ) : (
        <p>Loading event details...</p>
      )}

      {rsvps?.length > 0 ? <RSVPList rsvps={rsvps} /> : <p>No RSVPs yet.</p>}
    </div>
  );
};

export default ManageEvent;
