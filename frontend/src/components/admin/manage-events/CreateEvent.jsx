import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventImageUploader from "@/components/admin/EventImageUploader";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [eventImageId, setEventImageId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        `${BASE_URL}/api/events`,
        { title, description, startDate, endDate, location, eventImageId },
        { withCredentials: true }
      );
      alert("Event created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
    setLocation("");
    setEventImageId(null);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-4xl bg-white p-6">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-6">
            <label className="block mb-2 font-bold">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
              className="w-full p-4 h-16 rounded-lg bg-[#F5F5DC] outline-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Start Date & End Date */}
          <div className="mb-6 flex flex-col md:flex-row gap-6">
            <div className="w-full relative">
              <label className="block mb-2 font-bold">Start Date:</label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (date > endDate) {
                      setEndDate(date);
                    }
                  }}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full pl-12 pr-3 py-4 h-16 rounded-lg bg-[#F5F5DC] outline-none"
                  disabled={isSubmitting}
                  placeholderText="Select start date"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-[#F1BD19]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full relative">
              <label className="block mb-2 font-bold">End Date:</label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={startDate}
                  className="w-full pl-12 pr-3 py-4 h-16 rounded-lg bg-[#F5F5DC] outline-none"
                  disabled={isSubmitting}
                  placeholderText="Select end date"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-[#F1BD19]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block mb-2 font-bold">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              className="w-full p-4 h-16 rounded-lg bg-[#F5F5DC] outline-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block mb-2 font-bold">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="w-full p-4 rounded-lg bg-[#F5F5DC] outline-none"
              rows={5}
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Upload Photos */}
          <div className="mb-6">
            <label className="block mb-2 font-bold">Upload Photos:</label>
            <EventImageUploader
              onImageSelect={setEventImageId}
              autoSelectFirst={true}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-[45%] bg-[#F1BD19] text-black px-4 py-2 border-0 hover:opacity-80 transition disabled:opacity-50 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-[45%] bg-white text-[#11375C] border border-[#11375C] px-4 py-2 hover:bg-[#11375C] hover:text-white transition disabled:opacity-50 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
