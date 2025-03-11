import { Link } from "react-router-dom";

export default function QuickActions() {
    return (
        <div className="quickActions w-full max-w-4xl">
            <div className="w-full px-6">
                <h1 className="text-primary-red font-semibold text-2xl font-lora leading-[31px]">
                    Quick Actions
                </h1>
                <div className="flex flex-col justify-items-center items-center">
                    <div className="w-full flex flex-col-2 justify-items-center items-center gap-4">
                        <Link to="/admin/announcements" className="w-full">
                            <button className="w-full h-[198px] tablet-sm:h-[262px] flex flex-col items-center justify-center bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-8 px-4 border border-secondary-blue mt-8 gap-4 tablet-sm:gap-10">
                                <p className="leading-[24px] font-extrabold font-montserrat tablet-sm:font-lora tablet-sm:font-bold tablet-sm:leading-[41px] tablet-sm:text-[32px]">
                                    Create <br /> Announcements
                                </p>
                                <img
                                    src="/MegaphoneFill.png"
                                    alt="Megaphone"
                                    className="w-[70px] h-[70px] object-cover tablet-sm:w-[100px] tablet-sm:h-[100px]"
                                />
                            </button>
                        </Link>
                        <Link to="/admin/events" className="w-full">
                            <button className="w-full h-[198px] tablet-sm:h-[262px] flex flex-col items-center justify-center bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-8 px-4 border border-secondary-blue mt-8 gap-4">
                                <p className="leading-[24px] font-extrabold font-montserrat tablet-sm:font-lora tablet-sm:font-bold tablet-sm:leading-[41px] tablet-sm:text-[32px]">
                                    Create Event
                                </p>
                                <img
                                    src="/Calendar2EventFill.png"
                                    alt="Calendar2Event"
                                    className="w-[70px] h-[70px] object-cover tablet-sm:w-[100px] tablet-sm:h-[100px]"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
