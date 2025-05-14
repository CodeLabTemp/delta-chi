import MembershipForm from "@/components/MembershipForm";

const Membership = () => {
    console.log("Membership.jsx fired");
    return <div>
        <div className="bg-[url(/banner.png)] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] desktop:h-[300px] tablet-sm:h-[230px] mobile:h-[170px] h-[93px] bg-no-repeat bg-left bg-cover desktop:bg-contain flex flex-row bg-primary-yellow">
            <div className="w-3/6 tablet-sm:w-7/12 tablet-lg:w-6/12"></div>
            <div className="flex flex-col justify-center items-center"><h1 className=" text-primary-red font-bold text-[32px] font-lora leading-[41px] tablet-lg:font-merriweather tablet-lg:text-[64px] tablet-lg:font-black">Membership</h1></div>
        </div>
        <div className="bg-custom-yellow py-8 px-6 gap-y-8 tablet:gap-y-16 tablet:px-[50px] desktop:px-32 tablet:py-16">
            <div className="bg-white flex flex-col"> 
                <div className="border-b-[6px] border-primary-red px-8 py-8"> 
                    <h1 className="mb-8 text-primary-red font-semibold text-[24px] font-lora tablet:font-merriweather tablet:text-[48px] tablet:font-black">Why Join Delta Chi?</h1>
                    <p className="font-montserrat">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <img
                    src="/value1.jpg"
                    alt="Picture of the author"
                    className="w-full h-[319px] object-cover"
                    />
            </div>
        </div>
        <MembershipForm />
    </div>;
  };
  
  export default Membership;
  