import EventsPageComponent from "@/components/EventsPageComponent";


const Events = () => {
    console.log("Events.jsx fired");
    return <div>
        <div className="bg-[url(/banner.png)] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] desktop:h-[300px] tablet-sm:h-[230px] mobile:h-[170px] h-[93px] bg-no-repeat bg-left bg-cover desktop:bg-contain flex flex-row bg-primary-yellow">
            <div className="w-3/6 tablet-sm:w-7/12 tablet-lg:w-6/12"></div>
            <div className="flex flex-col justify-center items-center"><h1 className=" text-primary-red font-bold text-[32px] font-lora leading-[41px] tablet-lg:font-merriweather tablet-lg:text-[64px] tablet-lg:font-black">Events</h1></div>
        </div>
        <EventsPageComponent />
    </div>;
  };
  
  export default Events;
  
