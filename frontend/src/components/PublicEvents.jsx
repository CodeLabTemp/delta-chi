
export default function PublicEvents({ evBoard }) {
    const mainEvent = evBoard.find((event) => event.isMain);
    const otherEvents = evBoard.filter((event) => !event.isMain);
  
    return (
      <div className="px-4 md:px-10 lg:pl-28 lg:pr-16 pb-16 bg-white">
        {/* Title Portion */}
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
            <div className="card bg-white w-full md:w-[45%] h-[30rem]">
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
                <p className="mt-4 text-left text-gray-700 text-base">{mainEvent.eventDescription}</p>
              </div>
            </div>
          )}
  
          {/* Other Events */}
          <div className="flex flex-col gap-6 w-full md:w-[50%]">
            {otherEvents.map((event, index) => (
              <div key={index} className="flex gap-6">
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
                    <p className="font-light text-left text-gray-600 text-base max-sm:text-xs">{event.eventDate}</p>
                    <p className="mt-2 text-left text-gray-700 text-base">{event.eventDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/*Button */}
        <div className="flex justify-center pb-16 pt-10">
          <button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">
            View More
          </button>
        </div>
      </div>
    );
  }
  