

export default function PendingRequests() {
//Use Function to Limit
let requestsList = [
    {name:"Leo Levin", email:"leocintyre@gmail.com", position: "President", date: "1/12/2025"},
    {name:"Zain Lipshutz", email:"brandon50@yahoo.com", position: "President", date: "1/12/2025"},
    {name:"Justin Saris", email:"gfox@lee.org", position: "President", date: "1/12/2025"},
    {name:"Ruben Torff", email:"beckereric@yahoo.com", position: "President", date: "1/12/2025"}
  ]

return(
    <div className="pendingRequests w-full max-w-4xl">
        <div className="w-full bg-white p-5">
            <h1 className="text-primary-red font-semibold text-2xl font-lora leading-[31px]">Pending Requests</h1>
            <div className="flex flex-col gap-4 mt-6 tablet-lg:border tablet-lg:rounded-2xl tablet-lg:bg-custom-yellow tablet-lg:border-custom-gray tablet-lg:gap-0 tablet-lg:py-8 tablet-lg:px-4 "> 
                <div className="text-[#11375C] font-medium font-montserrat w-full hidden tablet-lg:flex border rounded-2xl border-custom-gray bg-custom-yellow gap-4 px-4 py-2 tablet-lg:bg-transparent tablet-lg:border-0 tablet-lg:gap-0 tablet-lg:py-0 tablet-lg:px-0 text-sm mobile-lg:text-b">
                    <div className="w-7/12 flex flex-col tablet-lg:w-10/12 tablet-lg:flex-row tablet-lg:align-text-top">
                        <div className="tablet-lg:w-3/12 tablet-lg:px-4 tablet-lg:pb-4 tablet-lg:border-r tablet-lg:border-custom-gray leading-[24px]">Name</div>
                        <div className="tablet-lg:w-5/12 tablet-lg:px-4 tablet-lg:pb-4 tablet-lg:border-r tablet-lg:border-custom-gray leading-[24px]">Email</div>
                        <div className="tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pb-4 tablet-lg:border-r tablet-lg:border-custom-gray leading-[24px]">Position</div>
                        <div className="tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pb-4 tablet-lg:border-r tablet-lg:border-custom-gray leading-[24px]">Date</div>
                    </div>
                    <div className="w-5/12 flex tablet-lg:px-4 gap-4 tablet-lg:flex-row tablet-lg:w-2/12"> 
                        Accept/Decline
                    </div>
                </div>
            {requestsList.length === 0 ? (
                <p className="text-center text-xl">No requests available.</p>
                ) : (
                    <div>
                        <div className="hidden tablet-lg:flex tablet-lg:flex-col">
                        {
                            requestsList.map((request) => (
                                <div className="w-full flex border rounded-2xl border-custom-gray bg-custom-yellow gap-4 px-4 py-2 tablet-lg:bg-transparent tablet-lg:border-0 tablet-lg:gap-0 tablet-lg:py-0 tablet-lg:px-0 text-sm mobile-lg:text-b" key={request.email}>
                                    <div className="w-7/12 flex flex-col tablet-lg:w-10/12 tablet-lg:flex-row">
                                        <div className="pb-1 tablet-lg:w-3/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.name}</div>
                                        <div className="pb-1 tablet-lg:w-5/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.email}</div>
                                        <div className="pb-1 tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.position}</div>
                                        <div className="pb-1 tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.date}</div>
                                    </div>
                                    <div className="w-5/12 flex flex-col justify-center gap-4 tablet-lg:flex-row tablet-lg:w-2/12 tablet-lg:py-2 tablet-lg:pl-4"> 
                                        <div className="flex items-center gap-2">
                                            <button className="border border-primary-yellow w-8 h-8 flex flex-col items-center justify-center bg-white  hover:bg-custom-gray">
                                                <img
                                                    src="/Accept.svg" 
                                                    alt="Accept"
                                                    className="w-[22px] h-[17px]"
                                                />
                                            </button>
                                            <p className="tablet-lg:hidden">Approve</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="border border-primary-yellow w-8 h-8 flex flex-col items-center justify-center bg-white  hover:bg-custom-gray">
                                                <img
                                                    src="/Decline.svg"
                                                    alt="Decline"
                                                    className="w-[22px] h-[17px]"
                                                />
                                            </button>
                                            <p className="tablet-lg:hidden">Decline</p>
                                        </div>
                                    </div>
                                </div>  
                        ))
                        }
                    </div>

                    <div className="w-full tablet-lg:hidden gap-4 flex-col">
                        {
                            requestsList.splice(0,3).map((request) => (
                                <div className="w-full flex border rounded-2xl border-custom-gray bg-custom-yellow gap-4 px-4 py-2 tablet-lg:bg-transparent tablet-lg:border-0 tablet-lg:gap-0 tablet-lg:py-0 tablet-lg:px-0 text-sm mobile-lg:text-b mb-4" key={request.email}>
                                    <div className="w-7/12 flex flex-col tablet-lg:w-10/12 tablet-lg:flex-row">
                                        <div className="pb-1 tablet-lg:w-3/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.name}</div>
                                        <div className="pb-1 tablet-lg:w-5/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.email}</div>
                                        <div className="pb-1 tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.position}</div>
                                        <div className="pb-1 tablet-lg:w-2/12 tablet-lg:px-4 tablet-lg:pt-2 tablet-lg:pb-2 tablet-lg:border-r tablet-lg:border-custom-gray">{request.date}</div>
                                    </div>
                                    <div className="w-5/12 flex flex-col justify-center gap-4 tablet-lg:flex-row tablet-lg:w-2/12 tablet-lg:py-2 tablet-lg:pl-4"> 
                                        <div className="flex items-center gap-2">
                                            <button className="border border-primary-yellow w-8 h-8 flex flex-col items-center justify-center bg-white  hover:bg-custom-gray">
                                                <img
                                                    src="/Accept.svg" 
                                                    alt="Accept"
                                                    className="w-[22px] h-[17px]"
                                                />
                                            </button>
                                            <p className="tablet-lg:hidden">Approve</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="border border-primary-yellow w-8 h-8 flex flex-col items-center justify-center bg-white  hover:bg-custom-gray">
                                                <img
                                                    src="/Decline.svg"
                                                    alt="Decline"
                                                    className="w-[22px] h-[17px]"
                                                />
                                            </button>
                                            <p className="tablet-lg:hidden">Decline</p>
                                        </div>
                                    </div>
                                </div>  
                        ))
                        }
                    </div>
                    </div>
                )}
                
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-6">
                <button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">View All</button>
            </div>
        </div>
    </div>
)
};