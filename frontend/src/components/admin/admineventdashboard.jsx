import { Link } from "react-router-dom";

export default function EventsDashboard() {
return(
    <div className = "eventsDashboard w-full max-w-4xl"> 
        <div className="w-full px-6">
            <h1 className="text-primary-red font-semibold text-2xl font-lora leading-[31px] mb-8 mt-8">Upcoming Events</h1>
            <div className="w-full gap-8 flex flex-col justify-items-center items-center">
                <div className="w-full flex flex-col rounded-2xl gap-4 tablet:flex-row">
                    <div className="w-full flex rounded-2xl gap-4 tablet:w-2/3">
                        <div className="flex flex-col w-1/2 gap-2">
                            <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">Title</h1>
                            <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">Date</p>
                            <p className="text-[#5B6665]">Lorem ipsum dolor sit amet consectetur. Enim </p>
                        </div>
                    </div>
                    <div className="w-full flex rounded-2xl gap-4 tablet:w-1/3 tablet:flex-col tablet:p-4 tablet:pl-0">
                        <button className="w-1/2 bg-primary-yellow text-black font-bold py-2 px-4 justify-center items-center text-center tablet:w-full">RSVP</button>
                        <button className="w-1/2 bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue tablet:w-full">Add to Calender</button>
                    </div>
                </div>
                <div className="w-full flex flex-col rounded-2xl gap-4 tablet:flex-row">
                    <div className="w-full flex rounded-2xl gap-4 tablet:w-2/3">
                        <div className="flex flex-col w-1/2 gap-2">
                            <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">Title</h1>
                            <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">Date</p>
                            <p className="text-[#5B6665]">Lorem ipsum dolor sit amet consectetur. Enim </p>
                        </div>
                    </div>
                    <div className="w-full flex rounded-2xl gap-4 tablet:w-1/3 tablet:flex-col tablet:p-4 tablet:pl-0">
                        <button className="w-1/2 bg-primary-yellow text-black font-bold py-2 px-4 justify-center items-center text-center tablet:w-full">RSVP</button>
                        <button className="w-1/2 bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue tablet:w-full">Add to Calender</button>
                    </div>
                </div>
                <Link to="/events"><button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">View More</button></Link> 
            </div>
        </div>
    </div>
)};
