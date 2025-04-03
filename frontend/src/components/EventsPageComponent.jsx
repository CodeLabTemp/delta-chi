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
    const [max, setMax] = useState(1); 
    const [eventsPast, setEventsPast] = useState([]);
    const [eventsCurr, setEventsCurr] = useState([]);
    const [buttonDisabled1, setButtonDisabled1] = useState(true);
    const [buttonDisabled2, setButtonDisabled2] = useState(false);
    const [buttonDisabled3, setButtonDisabled3] = useState(false);
    const [buttonDisabled4, setButtonDisabled4] = useState(false);

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
    
    const PageRender = (start, end) => {
        const eventCurr = events.filter((event) => new Date(event.startDate) - new Date() < 0)
        return <div className="w-full">
            {eventCurr.slice(start,start+1).length > 0 ? (
                eventCurr.slice(start,start+1).map((event) => (
                <div key={event._id} className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                    <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                        <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                    </div>
                    <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                        <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                        <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}</p>
                        <p className="text-[#5B6665] text-wrap text-ellipsis">{event.description}</p>
                    </div>
                </div>
            ))
            ) : (
            <p className="text-gray-500 col-span-3">
                No upcoming events available.
            </p>
            )}
            {eventCurr.slice(start+1,end).length > 0 ? (
                eventCurr.slice(start+1,end).map((event) => (
                <div className="w-full">
                    <hr className="my-8"></hr>
                    <div key={event._id} className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                        <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                            <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                            <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                            <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}</p>
                            <p className="text-[#5B6665] text-wrap text-ellipsis">{event.description}</p>
                        </div>
                    </div>  
                    
                </div>
            ))
            ) : (
            <p className="text-gray-500 col-span-3">
            </p>
            )}
        </div>  
    }

    

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

    const CurrentEventsRender = () => {
        return <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
            {page === "one" && PageRender(0,4)}
            {page === "two" && PageRender(4,8)}
            {page === "three" && PageRender(8,12)}
            {page === "four" && PageRender(20,24)}
            <div className="w-full flex justify-center items-center mt-9">
                <div className="flex w-fit h-fit join rounded-2xl gap-[10px] bg-custom-gray mb-6">
                    <div className="join-item rounded-2xl bg-custom-gray">
                        <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-primary-yellow disabled:text-black" disabled={buttonDisabled1} onClick={setPage1}>1</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4">
                        <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-primary-yellow disabled:text-black" disabled={buttonDisabled2} onClick={setPage2}>2</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                        <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-primary-yellow disabled:text-black" disabled={buttonDisabled3} onClick={setPage3}>3</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                        <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 disabled:bg-primary-yellow disabled:text-black" disabled={buttonDisabled4} onClick={setPage4}>4</button>
                    </div>
                </div>
            </div>
        </div>        
    }

    const PastEventsRender = () => { 
        const eventPast = events.filter((event) => new Date(event.startDate) - new Date() < 0);
        console.log(eventPast);
        return <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
        {eventPast.length > 0 ? (
            eventPast.slice(0,1).map((event) => (
            <div key={event._id} className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                </div>
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                    <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}</p>
                    <p className="text-[#5B6665] text-wrap text-ellipsis">{event.description}</p>
                </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">
            No upcoming events available.
          </p>
        )}
        {eventPast.length > 0 ? (
            eventPast.slice(1,4).map((event) => (
            <div className="w-full">
                <hr className="my-8"></hr>
                <div key={event._id} className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                    <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                        <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                    </div>
                    <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                        <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                        <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}</p>
                        <p className="text-[#5B6665] text-wrap text-ellipsis">{event.description}</p>
                    </div>
                </div>  
                
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">
          </p>
        )}
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
                
            </div>
    </div>
    )
};