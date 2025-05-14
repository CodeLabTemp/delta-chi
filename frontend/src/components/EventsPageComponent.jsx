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
    const [buttonDisabledList, setButtonDisabledList] = useState([]); 
    const [buttonMap, setButtonMap] = useState(new Map());
    const [mapSize, setMapSize] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentNum, setCurrentNum] = useState(1);
    const [currentButtonStart, setCurrentButtonStart] = useState(0);
    const [currentButtonEnd, setCurrentButtonEnd] = useState(0);

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

    useEffect(() => {
        fillButtonMap();
        setMapSize(Math.ceil(events.length/4));
        changeButtomMap(1);
    }, [events])

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
        changeButtomMap(1);
        setCurrentNum(0);
        console.log(isCurrent);
    }
    const fillButtonMap = () => {
        for(let i = 0; i < Math.ceil(events.length/4); i++){
            if(i == 0){
                buttonMap.set(i, true);
            } else {
                buttonMap.set(i, false);
            }
        }
        setCurrentButtonStart(0); 
        if (buttonMap.length >= 5){
            setCurrentButtonStart(5);
        } else {
            setCurrentButtonStart(buttonMap.length);
        }
        setCurrentNum(0);
    }
    const changeButtomMap = (num) => {
        let temp = num;
        let size = buttonMap.size;
        for(let i = 0; i < size; i++){
            if(i == num - 1){
                buttonMap.set(i, true);
            } else {
                buttonMap.set(i, false);
            }
        }

        if((num - 1) <= 2 && num >= size - 2){
            setCurrentButtonStart(0);
            setCurrentButtonEnd(size);
        } else if ((num - 1) <= 2 && num < size - 2) {
            setCurrentButtonStart(0);
            console.log(size);
            setCurrentButtonEnd(5);
        } else if ((num - 1) > 2 && num >= size - 2) {
            setCurrentButtonStart(size - 5);
            setCurrentButtonEnd(size);
        } else {
            setCurrentButtonStart(num - 2);
            setCurrentButtonEnd(num + 2);
        }
        setCurrentNum(num - 1);
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
            <div className="flex flex-col gap-2 tablet-lg:w-1/2 tablet-lg:h-[262px] text-wrap max-w-full" >
                <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")} - {format(new Date(event.endDate), "MMMM d, yyyy h:mm a")}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap tablet-lg:hidden break-words">{event.description.length < 750 ? event.description : `${event.description.substring(0, 750)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap hidden tablet-lg:inline tablet:hidden break-words">{event.description.length < 125 ? event.description : `${event.description.substring(0, 125)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap hidden tablet:inline desktop:hidden break-words">{event.description.length < 350 ? event.description : `${event.description.substring(0, 350)}...`}</p>
                <p className="text-[#5B6665] container max-w-full text-wrap hidden desktop:inline break-words">{event.description.length < 550 ? event.description : `${event.description.substring(0, 550)}...`}</p>
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
    const ButtonRender = () => {
        return <div className="w-full flex justify-center items-center pt-9 tablet-lg:bg-white">
        <div className="flex w-fit h-fit join rounded-2xl gap-[10px] bg-custom-gray mb-6">
            {mapSize > 0 && 
                <div className="join-item rounded-2xl bg-custom-gray">
                    <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-custom-gray shadow-none" onClick={() => {changeButtomMap(1)}}><img src="/Arrow.svg" alt="Arrow" className="w-[22px] h-[17px]"/></button>
                </div>}
            {
                buttonMap.size > 0 ? (
                    Array.from(buttonMap.entries()).slice(currentButtonStart, currentButtonEnd).map(([key, value]) => (
                        <div className="join-item rounded-2xl bg-custom-gray">
                            <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled={buttonMap.get(key)} 
                            onClick={() => {changeButtomMap(key + 1)}}>{key + 1}{console.log(key, value, currentNum)}</button>
                        </div>  
                    ))
                ) : (
                    <button className="btn bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-secondary-blue shadow-none disabled:text-white" disabled="True">No upcoming events available</button>
                )
            }
            {mapSize > 0 && 
                <div className="join-item rounded-2xl bg-custom-gray">
                    <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-custom-gray shadow-none" onClick={() => {changeButtomMap(buttonMap.size)}}><img src="/Arrow-Left.svg" alt="Arrow" className="w-[22px] h-[17px]"/></button>
                </div>}
            
        </div>
    </div>
    }
    const CurrentEventsRender = () => {
        const eventCurr = events.filter((event) => new Date(event.startDate) - new Date() < 0);
        //buttonDisabledList.fill(false); 
        return <div className="w-full">
            <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
                {console.log(currentNum)}
                {page === "one" && EventsRender(4*(currentNum),4*(currentNum) + 4, eventCurr)}
            </div>
            <ButtonRender />
        </div>        
    }

    const PastEventsRender = () => { 
        const eventPast = events.filter((event) => new Date(event.startDate) - new Date() < 0);
        console.log(eventPast);
        return <div className="w-full">
            <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
                {console.log(currentNum)}
                {page === "one" && EventsRender(4*(currentNum),4*(currentNum) + 4, eventPast)}
            </div>
            <ButtonRender />
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