import { Link } from "react-router-dom"
import { useState} from "react"


export default function EventsPageComponent() {
    const [isCurrent, setCurrent] = useState("upcoming")
    const setCurr = () => {
        setCurrent("upcoming");
    }
    const setPast = () => {
        setCurrent("past");
    }
    const CurrentButtonRender = () => {
        return <div className="flex w-full join rounded-2xl bg-custom-gray gap-4 mb-6">
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button className="btn bg-primary-yellow rounded-2xl w-full py-2 px-4 text-xs border-0">Upcoming Events</button>
            </div>
            <div className="join-item rounded-2xl bg-custom-gray w-1/2">
                <button className="btn bg-custom-gray rounded-2xl w-full py-2 px-4 text-xs border-0" onClick={setPast}>Past Events</button>
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
            <div className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                </div>
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">Title</h1>
                    <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">Date</p>
                    <p className="text-[#5B6665]">Lorem ipsum dolor sit amet consectetur. Congue enim eleifend quis scelerisque a. Mi sit lacinia id sed id ullamcorper. or in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                </div>
            </div>
            <hr className="my-8"></hr>
            <div className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
                </div>
                <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                    <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">Title</h1>
                    <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">Date</p>
                    <p className="text-[#5B6665]">Lorem ipsum dolor sit amet consectetur. Congue enim eleifend quis scelerisque a. Mi sit lacinia id sed id ullamcorper. or in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-9">
                <div className="flex w-fit h-fit join rounded-2xl gap-[10px] bg-custom-gray mb-6">
                    <div className="join-item rounded-2xl bg-custom-gray">
                        <button className="btn btn-square bg-custom-gray rounded-2xl text-xs border-0 checked:bg-primary-yellow" checked="checked" onClick={setCurr}>1</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4">
                        <button className="btn btn-square bg-primary-yellow rounded-2xl text-xs border-0">2</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                        <button className="btn btn-square bg-primary-yellow rounded-2xl text-xs border-0">2</button>
                    </div>
                    <div className="join-item rounded-2xl bg-custom-gray w-1/4 h-9">
                        <button className="btn btn-square bg-primary-yellow rounded-2xl text-xs border-0">2</button>
                    </div>
                </div>
            </div>
        </div>        
    }
    const PastEventsRender = () => { 
        return <div className="bg-white p-6 tablet-lg:py-[70px] tablet-lg:px-[50px]">
        <div className="w-full flex-row tablet-lg:flex rounded-2xl gap-4">
            <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                <img src="/aboutpic.png" alt="" className="w-full rounded-2xl" />
            </div>
            <div className="flex flex-col gap-2 tablet-lg:w-1/2">
                <h1 className="text-[#333333] font-semibold text-2xl font-lora leading-[31px]">Title</h1>
                <p className="text-[#333333] text-xs font-light font-montserrat leading-[15px]">Date</p>
                <p className="text-[#5B6665]">Lorem ipsum dolor sit amet consectetur. Congue enim eleifend quis scelerisque a. Mi sit lacinia id sed id ullamcorper. or in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
            </div>
        </div>
    </div>        
    }

  return(
  <div className = "Events Page Component">
        <div className="bg-custom-yellow p-6 desktop:px-[158px]">
            <div className="w-full flex justify-center items-center"> 
                <div className="w-full flex">
                    {isCurrent === "upcoming" && <CurrentButtonRender />}
                    {isCurrent === "past" && <PastButtonRender />}
                </div>
            </div>
            {isCurrent === "upcoming" && <CurrentEventsRender />}
            {isCurrent === "past" && <PastEventsRender />}
            
        </div>
  </div>
  )
};