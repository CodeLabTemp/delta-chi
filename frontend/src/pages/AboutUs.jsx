const AboutUs = () => {
    console.log("AboutUs.jsx fired");
    return <div>
      <div className="bg-[url(/banner.png)] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] desktop:h-[300px] tablet-sm:h-[230px] mobile:h-[180px] h-[93px] bg-no-repeat bg-left bg-cover desktop:bg-contain flex flex-row bg-primary-yellow">
        <div className="w-3/6 tablet-sm:w-7/12 tablet-lg:w-6/12"></div>
        <div className="flex flex-col justify-center items-center"><h1 className=" text-primary-red font-bold text-[32px] font-lora leading-[41px] tablet-lg:font-merriweather tablet-lg:text-[64px] tablet-lg:font-black">About Us</h1></div>
        
      </div>
      <div className="bg-custom-yellow flex flex-col desktop:px-40 tablet:px-20 tablet-lg:px-20 tablet:py-20 tablet-lg:py-14 py-6 px-6 gap-6 tablet:gap-20">
        
        <div className="bg-white flex tablet:flex-row flex-col"> 
          <div className="tablet:border-r-[6px] tablet:border-t-0 border-t-[6px] border-primary-red tablet:w-1/2 px-8 py-8"> 
            <h1 className="mb-8 text-primary-red font-semibold text-[24px] font-lora tablet:font-merriweather tablet:text-[48px] tablet:font-black">Value #1</h1>
            <p className="font-montserrat">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <img
              src="/value1.jpg"
              alt="Picture of the author"
              className="tablet:w-1/2 w-full h-[319px] tablet-sm:h-auto tablet:order-last order-first object-cover"
            />
        </div>

        <div className="bg-white flex tablet:flex-row-reverse flex-col"> 
          <div className="tablet:border-t-0 border-t-[6px] border-primary-red tablet:w-1/2 px-8 py-8"> 
            <h1 className="mb-8 text-primary-red font-bold text-[24px] font-lora tablet:font-merriweather tablet:text-[48px] tablet:font-black">Value #2</h1>
            <p className="font-montserrat">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <img
              src="/value2.jpg"
              alt="Picture of the author"
              className="border-r-0 tablet:border-r-[6px]  border-primary-red tablet:w-1/2 w-full h-[319px] tablet-sm:h-auto tablet:order-last order-first object-cover"
            />
        </div>

        <div className="bg-white flex tablet:flex-row flex-col"> 
          <div className="tablet:border-r-[6px] tablet:border-t-0 border-t-[6px] border-primary-red tablet:w-1/2 px-8 py-8"> 
            <h1 className="mb-8 text-primary-red font-bold text-[24px] font-lora tablet:font-merriweather tablet:text-[48px] tablet:font-black">Value #3</h1>
            <p className="font-montserrat">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <img
              src="/value3.jpg"
              alt="Picture of the author"
              className="tablet:w-1/2 w-full h-[319px] tablet-sm:h-auto tablet:order-last order-first object-cover"
            />
        </div>
      </div>
    </div>;
  };
  
  export default AboutUs;
  