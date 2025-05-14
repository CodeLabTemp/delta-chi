import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 6;
const DEFAULT_IMAGE = "/event.jpg";

const EventsPage = () => {
  const { user } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/events`, {
        withCredentials: true,
      });

      // Show all events
      setEvents(response.data.events || []);
    } catch (error) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrPage(selected);
  };

  const handleRSVP = async (eventId, rsvpId, currentStatus) => {
    try {
      if (!rsvpId) {
        await axios.post(
          `${BASE_URL}/api/events/${eventId}/rsvps`,
          { status: "attending" },
          { withCredentials: true }
        );
      } else {
        const newStatus =
          currentStatus === "attending" ? "not attending" : "attending";
        await axios.patch(
          `${BASE_URL}/api/rsvps/${rsvpId}`,
          { status: newStatus },
          { withCredentials: true }
        );
      }

      fetchEvents(); // Refresh RSVP status
    } catch (error) {
      alert("Failed to RSVP. Please try again later.");
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    document.getElementById("event_modal").checked = true;
  };

  const closeModal = () => {
    document.getElementById("event_modal").checked = false;
    setSelectedEvent(null);
  };

  if (!user) return <div>Loading...</div>;
  if (loading) return <div className="text-center mt-8">Loading events...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const startIndex = currPage * ITEMS_PER_PAGE;
  const displayedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const numOfPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#11375C] font-merriweather">
        All Events ({events.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {displayedEvents.map((event) => (
          <div
            key={event._id}
            className="border p-4 rounded shadow bg-custom-yellow text-[#11375C] break-words hover:shadow-lg transition"
          >
            <img
              src={event.image?.url || DEFAULT_IMAGE}
              alt={event.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg break-words">{event.title}</h3>
            <p className="text-sm">
              <strong>Start:</strong>{" "}
              {format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}
            </p>
            <p className="text-sm mb-2">
              <strong>End:</strong>{" "}
              {format(new Date(event.endDate), "MMMM d, yyyy h:mm a")}
            </p>
            <p className="text-sm mb-2 max-h-[48px] overflow-hidden text-ellipsis line-clamp-2 break-words">
              {event.description}
            </p>
            <p className="text-sm mb-2">
              <strong>Your RSVP:</strong>{" "}
              {event.userRSVPStatus || "Not RSVPed"}
            </p>
            <button
              onClick={() =>
                handleRSVP(event._id, event.userRSVPId, event.userRSVPStatus)
              }
              className={`w-full py-2 rounded font-semibold ${
                event.userRSVPStatus === "attending"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {event.userRSVPStatus === "attending" ? "Un-RSVP" : "RSVP"}
            </button>
            <button
              className="mt-2 underline text-sm text-blue-700 hover:text-blue-900"
              onClick={() => openModal(event)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={numOfPages}
        onPageChange={handlePageChange}
        forcePage={currPage}
        containerClassName="flex items-center justify-center gap-2 my-8"
        pageClassName="px-3 py-1 rounded border hover:bg-gray-100"
        previousClassName="px-3 py-1 rounded border hover:bg-gray-100"
        nextClassName="px-3 py-1 rounded border hover:bg-gray-100"
        activeClassName="bg-yellow-500 text-black border-yellow-500"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
      />

      {/* Modal */}
      <input type="checkbox" id="event_modal" className="modal-toggle" />
      <div className="modal" onClick={closeModal}>
        <div
          className="modal-box relative bg-[#F5F5DC] max-w-xl rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedEvent && (
            <>
              <button
                className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={closeModal}
              >
                ✕
              </button>

              <img
                src={selectedEvent.image?.url || DEFAULT_IMAGE}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-2xl font-bold text-gray-800 break-words">
                {selectedEvent.title}
              </h3>

              <div className="flex flex-col gap-1 text-gray-700 mt-2 text-sm">
                <p>📅 <span className="font-medium">{format(new Date(selectedEvent.startDate), "MMMM d, yyyy h:mm a")}</span></p>
                <p>📍 <span className="font-medium">{selectedEvent.location || "No location provided"}</span></p>
                <p>⏰ <span className="font-medium">{format(new Date(selectedEvent.endDate), "MMMM d, yyyy h:mm a")}</span></p>
              </div>

              <p className="py-4 text-gray-700 break-words">{selectedEvent.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
