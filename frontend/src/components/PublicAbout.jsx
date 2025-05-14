import { Link } from "react-router-dom"


export default function PublicAbout() {
  return(
  <div className = "About">
        <div className="w-full mobile:h-[680px] tablet:h-[463px] flex flex-col row-start-2 items-center gap-8 tablet:gap-[72px] px-6 tablet:px-[50px] desktop:px-[160px] py-8 tablet:py-[72px] justify-center tablet:flex-row bg-custom-yellow text-custom-black font-montserrat">
            <img
                src="/aboutpic.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-2xl w-full mobile-lg:w-[430px] tablet:w-[409.5px] desktop:w-[524px] h-[319px] order-last tablet:order-first object-cover"
            />
            <div className="w-full h-auto mobile-lg:h-[265px] tablet:h-[265px] desktop:h-[241px] tablet:w-[409.5px] desktop:w-[524px] text-center tablet:text-left">
                <h1 className="mb-8 text-primary-red font-bold text-[32px] font-lora leading-[41px]">Building a better future</h1>
                <p className="text-base">Lorem ipsum dolor sit amet consectetur. Congue enim eleifend quis scelerisque a. Mi sit lacinia id sed id ullamcorper. Fermentum vulputate mus at iaculis sociis vitae. Mauris nulla sagittis ac euismod malesuada cras in.</p>
                <Link to="/aboutus"><button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue mt-8">About Us</button></Link>
            </div>
        </div>
  </div>
  )
};