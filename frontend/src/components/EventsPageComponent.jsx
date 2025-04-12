import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";


export default function EventsPageComponent() {
    const [isCurrent, setCurrent] = useState("upcoming")
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState("one");
    const [buttonDisabled1, setButtonDisabled1] = useState(true);
    const [buttonDisabled2, setButtonDisabled2] = useState(false);
    const [buttonDisabled3, setButtonDisabled3] = useState(false);
    const [buttonDisabled4, setButtonDisabled4] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [EventChoice, setEventChoice] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
        document.getElementById("event_modal").checked = true;
    };

    const closeModal = () => {
        document.getElementById("event_modal").checked = false;
        setSelectedEvent(null);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/api/events`, {
            withCredentials: true,
        });
        
        setEvents(response.data.events);
        } catch (error) {
        setError("Failed to load events. Please try again later.");
        } finally {
        setLoading(false);
        } 
    };

    const setCurr = () => {
        setCurrent('upcoming');
        console.log(isCurrent);
    }
    const setPast = () => {
        setCurrent('past');
        console.log(isCurrent);
    }
    const setPage1 = () => {
        setPage("one"); 
        setButtonDisabled1(true); 
        setButtonDisabled2(false);
        setButtonDisabled3(false);
        setButtonDisabled4(false);
    }
    const setPage2 = () => {
        setPage("two"); 
        setButtonDisabled1(false); 
        setButtonDisabled2(true);
        setButtonDisabled3(false);
        setButtonDisabled4(false);
    }
    const setPage3 = () => {
        setPage("three"); 
        setButtonDisabled1(false); 
        setButtonDisabled2(false);
        setButtonDisabled3(true);
        setButtonDisabled4(false); 
    }
    const setPage4 = () => {
        setPage("four"); 
        setButtonDisabled1(false); 
        setButtonDisabled2(false);
        setButtonDisabled3(false);
        setButtonDisabled4(true); 
    }
    const CurrentButtonRender = () => {
        return <div className="flex w-full join rounded-2xl bg-custom-gray gap-4 mb-6">
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button className="btn bg-primary-yellow rounded-2xl w-full py-2 px-4 text-xs border-0">Upcoming Events</button>
            </div>
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button type="sumbit"className="btn bg-custom-gray rounded-2xl w-full py-2 px-4 text-xs border-0" onClick={setPast}>Past Events</button>
            </div>
        </div>         
    }
    const PastButtonRender = () => {
        return <div className="flex w-full join rounded-2xl bg-custom-gray gap-4 mb-6">
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button className="btn bg-custom-gray rounded-2xl w-full py-2 px-4 text-xs border-0" onClick={setCurr}>Upcoming Events</button>
            </div>
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button className="btn bg-primary-yellow rounded-2xl w-full py-2 px-4 text-xs border-0">Past Events</button>
            </div>
        </div>         
    }

    const IndividualEvent = (event) => {
        return <div key={event._id} className="w-full flex-row tablet-lg:flex rounded-2xl gap-4" onClick={() => openModal(event)}>
            <div className="flex flex-col gap-2 tablet-lg:w-1/2 h-[262px]">
                <img src={event.hasOwnProperty("image") && event.image != null && event.image.hasOwnProperty("url") ? (event.image.url) : ("/aboutpic.png")} alt="" className="w-full rounded-2xl h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 tablet-lg:w-1/2 tablet-lg:h-[262px]" >
                <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")} - {format(new Date(event.endDate), "MMMM d, yyyy h:mm a")}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap text-ellipsis tablet-lg:hidden">{event.description.length < 750 ? event.description : `${event.description.substring(0, 750)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap text-ellipsis hidden tablet-lg:inline tablet:hidden">{event.description.length < 125 ? event.description : `${event.description.substring(0, 125)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap text-ellipsis hidden tablet:inline desktop:hidden">{event.description.length < 350 ? event.description : `${event.description.substring(0, 350)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap text-ellipsis hidden desktop:inline ">{event.description.length < 550 ? event.description : `${event.description.substring(0, 550)}...`}</p>
            </div>
        </div>
    }

    const EventsRender = (start, end, eventsList) => { 
        return <div className="w-full">
            {eventsList.slice(start,start+1).length > 0 ? (
                eventsList.slice(start,start+1).map((event) => (
                    IndividualEvent(event)
            ))
            ) : (
            <p className="text-gray-500 col-span-3">
                No upcoming events available.
            </p>
            )}
            {eventsList.slice(start+1,end).length > 0 ? (
                eventsList.slice(start+1,end).map((event) => (
                <div className="w-full">
                    <hr className="my-8"></hr>
                    {IndividualEvent(event)}
                </div>
            ))
            ) : (
            <p className="text-gray-500 col-span-3">
            </p>
            )}
        </div>  
    }

    const CurrentEventsRender = () => {
        const eventCurr = events.filter((event) => new Date(event.startDate) - new Date() > 0);
        return <div className="w-full">
            <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
                {page === "one" && EventsRender(0,4, eventCurr)}
                {page === "two" && EventsRender(4,8, eventCurr)}
                {page === "three" && EventsRender(8,12, eventCurr)}
                {page === "four" && EventsRender(20,24, eventCurr)}
            </div>
            <div className="w-full flex justify-center items-center pt-9 tablet-lg:bg-white">
                    <div className="flex w-fit h-fit join rounded-2xl gap-[10px] bg-custom-gray mb-6">
                        <div className="join-item rounded-2xl bg-custom-gray">
                            <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled={buttonDisabled1} onClick={setPage1}>1</button>
                        </div>
                        <div className="join-item rounded-2xl bg-custom-gray w-1/4">
                            <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled={buttonDisabled2} onClick={setPage2}>2</button>
                        </div>
                        <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                            <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled={buttonDisabled3} onClick={setPage3}>3</button>
                        </div>
                        <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                            <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled={buttonDisabled4} onClick={setPage4}>4</button>
                        </div>
                    </div>
                </div>
        </div>        
    }

    const PastEventsRender = () => { 
        const eventPast = events.filter((event) => new Date(event.startDate) - new Date() < 0);
        console.log(eventPast);
        return <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
            {EventsRender(0,4, eventPast)}
        </div>        
    }






    if (loading) return <div className="text-center mt-8">Loading events...</div>;
    if (error)
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    return(
    <div className = "Events Page Component">
            <div className="bg-custom-yellow p-6 desktop:px-[158px]">
                <div className="w-full flex justify-center items-center"> 
                    <div className="w-full flex">
                        {isCurrent === 'upcoming' && <CurrentButtonRender />}
                        {isCurrent === 'past' && <PastButtonRender />}
                    </div>
                </div>
                {isCurrent === "upcoming" && <CurrentEventsRender />}
                {isCurrent === "past" && <PastEventsRender />}
        
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
                    {selectedEvent.image && selectedEvent.image != null &&  <img
                        src={selectedEvent.image.hasOwnProperty("url") ? (selectedEvent.image.url) : ("/aboutpic.png")}
                        alt={selectedEvent.eventName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />}

                    {/* Event Details */}
                    <h3 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h3>

                    {/* Date, Location, Time */}
                    <div className="flex justify-between items-center text-gray-700 mt-2 text-sm">
                        <p>
                        📅 <span className="font-medium">{format(new Date(selectedEvent.startDate), "MMMM d, yyyy")}</span>
                        </p>
                        <p>
                        📍 <span className="font-medium">{selectedEvent.eventLocation}</span>
                        </p>
                        <p>
                        ⏰ <span className="font-medium">{format(new Date(selectedEvent.startDate), "h:mm a")} - {format(new Date(selectedEvent.endDate), "h:mm a")}</span>
                        </p>
                    </div>

                    {/* Full Event Description */}
                    <p className="py-4 text-gray-700">{selectedEvent.description}</p>
                    </>
                )}
                </div>
            </div>
        </div>

    </div>
    )
};