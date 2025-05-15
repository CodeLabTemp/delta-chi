import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function EventsDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    const handleRSVP = async (eventId, rsvpId, currentStatus) => {
        try {
            if (!rsvpId) {
            // RSVP for the first time
            await axios.post(
                `${BASE_URL}/api/events/${eventId}/rsvps`,
                { status: "attending" },
                { withCredentials: true }
            );
            } else {
            // Toggle RSVP status
            const newStatus =
                currentStatus === "attending" ? "not attending" : "attending";
            await axios.patch(
                `${BASE_URL}/api/rsvps/${rsvpId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            }

            fetchEvents();
            alert("RSVP status updated!");
        } catch (error) {
            alert("Failed to RSVP. Please try again later.");
        }
    };
    const EventsRender = () => { 
        const eventCurr = events.filter((event) => new Date(event.startDate) - new Date() < 0); 
        console.log(eventCurr);
        return <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
            <div className="w-full">
                {eventCurr.slice(-2).length > 0 ? (
                    eventCurr.slice(-2).map((event) => (
                        <div className="w-full flex flex-col rounded-2xl gap-4 tablet:flex-row">
                            <div className="w-full flex rounded-2xl gap-4 tablet:w-2/3">
                                <div className="flex flex-col w-1/2 gap-2">
                                    <img src="/aboutpic.jpg" alt="" className="w-full rounded-2xl" />
                                </div>
                                <div className="flex flex-col w-1/2 gap-2">
                                    <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">{event.title}</h1>
                                    <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">{format(new Date(event.startDate), "MMMM d, yyyy h:mm a")}</p>
                                    <p className="text-[#5B6665]">{event.description.length < 100 ? event.description : `${event.description.substring(0, 100)}...`}</p>
                                </div>
                            </div>
                            <div className="w-full flex rounded-2xl gap-4 tablet:w-1/3 tablet:flex-col tablet:p-4 tablet:pl-0">
                                <button className={`w-1/2 bg-primary-yellow text-black font-bold py-2 px-4 justify-center items-center text-center tablet:w-full ${event.userRSVPStatus === "attending" ? "bg-primary-red hover:bg-[#9e2f26]" : "bg-primary-yellow hover:bg-[#d6a815]"}`} onClick={() => handleRSVP(event._id, event.userRSVPId, event.userRSVPStatus)}>{event.userRSVPStatus === "attending" ? "Un-RSVP" : "RSVP"}</button>
                                <button className="w-1/2 bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue tablet:w-full">Add to Calender</button>
                            </div>
                        </div>  
                ))
                ) : (
                <p className="text-gray-500 col-span-3">
                    No upcoming events available.
                </p>
                )}
            </div>
        </div>        
    }

    {/*if (!user) return <div>Loading...</div>;*/}

    if (loading) return <div className="text-center mt-8">Loading events...</div>;

    if (error)
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    return(
        <div className = "eventsDashboard w-full max-w-4xl"> 
            <div className="w-full px-6">
                <h1 className="text-primary-red font-semibold text-2xl font-lora leading-[31px] mb-8 mt-8">Upcoming Events</h1>
                <div className="w-full gap-8 flex flex-col justify-items-center items-center">
                    {<EventsRender />}
                    <Link to="/events"><button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">View More</button></Link> 
                </div>
            </div>
        </div>
)};
