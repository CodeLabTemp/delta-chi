import { useState } from "react";

export default function PublicEvents({ evBoard }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.getElementById("event_modal").checked = true;
  };

  const closeModal = () => {
    document.getElementById("event_modal").checked = false;
    setSelectedEvent(null);
  };

  const mainEvent = evBoard.find((event) => event.isMain);
  const otherEvents = evBoard.filter((event) => !event.isMain);

  return (
    <div className="px-4 md:px-10 lg:pl-28 lg:pr-16 pb-16 bg-white">
      {/* Title Section */}
      <div className="space-y-4 pt-16">
        <h1 className="text-[#CA3D31] font-lora font-bold text-3xl">Events</h1>
        <h2 className="text-gray-600 font-montserrat text-lg">
          Check out new events and RSVP
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 pt-6">
        {/* Main Event */}
        {mainEvent && (
          <div
            className="card bg-white w-full md:w-[45%] h-[30rem] cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
            onClick={() => openModal(mainEvent)}
          >
            <figure className="rounded-xl overflow-hidden">
              <img
                src={mainEvent.eventImage}
                alt={mainEvent.eventName}
                className="w-full h-[20rem] object-cover"
              />
            </figure>
            <div className="card-body py-4 px-0">
              <h3 className="text-3xl font-lora font-semibold text-left">{mainEvent.eventName}</h3>
              <p className="font-light text-left text-gray-600 text-lg">{mainEvent.eventDate}</p>
              <p className="mt-4 text-left text-gray-700 text-base">
                {mainEvent.eventDescription.length > 140
                  ? mainEvent.eventDescription.slice(0, 140) + "..."
                  : mainEvent.eventDescription}
              </p>
            </div>
          </div>
        )}

        {/* Other Events */}
        <div className="flex flex-col gap-6 w-full md:w-[50%]">
          {otherEvents.map((event, index) => (
            <div
              key={index}
              className="flex gap-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => openModal(event)}
            >
              {/* Image Card */}
              <div className="card bg-white w-[45%] h-[9rem]">
                <img
                  src={event.eventImage}
                  alt={event.eventName}
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
              {/* Text Card */}
              <div className="card bg-white w-[50%] h-[9rem] flex items-center">
                <div>
                  <h3 className="text-xl font-lora font-semibold text-left">{event.eventName}</h3>
                  <p className="font-light text-left text-gray-600 text-base">{event.eventDate}</p>
                  <p className="mt-2 text-left text-gray-700 text-base">
                    {event.eventDescription.length > 80
                      ? event.eventDescription.slice(0, 80) + "..."
                      : event.eventDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center pb-16 pt-10">
        <button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">
          View More
        </button>
      </div>

      {/* Modal */}
      <input type="checkbox" id="event_modal" className="modal-toggle" />
      <div className="modal" onClick={closeModal}>
        <div
          className="modal-box relative bg-[#F5F5DC] max-w-xl rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedEvent && (
            <>
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={closeModal}
              >
                ✕
              </button>

              {/* Event Image */}
              <img
                src={selectedEvent.eventImage}
                alt={selectedEvent.eventName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Event Details */}
              <h3 className="text-2xl font-bold text-gray-800">{selectedEvent.eventName}</h3>

              {/* Date, Location, Time */}
              <div className="flex justify-between items-center text-gray-700 mt-2 text-sm">
                <p>
                  📅 <span className="font-medium">{selectedEvent.eventDate}</span>
                </p>
                <p>
                  📍 <span className="font-medium">{selectedEvent.eventLocation}</span>
                </p>
                <p>
                  ⏰ <span className="font-medium">{selectedEvent.eventTime}</span>
                </p>
              </div>

              {/* Full Event Description */}
              <p className="py-4 text-gray-700">{selectedEvent.eventDescription}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
