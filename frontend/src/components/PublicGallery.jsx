import { useEffect, useState } from "react"

export default function PublicGallery({galleryPics}) {
    const [isMobile, setIsMobile] = useState(false);
    const handleResize=()=>{ //Remove this and just add 4 gallery pics
        if(window.innerWidth < 1000){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
    }
    
    useEffect(()=>{
        window.addEventListener("resize",handleResize)
    })
    return(
    <div className = "Gallery">
        <div className="w-full h-[625px] tablet-sm:h-fit flex flex-col row-start-2 items-center justify-items-center bg-white text-custom-black font-montserrat gap-8 tablet:gap-16 px-6 tablet:px-[50px] desktop:px-[160px] py-8 tablet:py-16">
            <h1 className=" text-primary-red font-bold text-[32px] font-lora leading-[41px]">Gallery</h1>
            {/* desktop view */}
            <div className = "grid grid-cols-2 grid-rows-1 gap-x-6 gap-y-8 tablet:gap-x-8 tablet-sm:grid-cols-4 justify-center">
                {galleryPics.length === 0 && 
                    <div>
                        No gallery photos available.
                    </div>
                }
                {
                    galleryPics.map((photo)=>(
                        <div key={photo.photoName}> 
                            <img
                                src={photo.photoSource}
                                width={500}
                                height={500}
                                alt={photo.photoName}
                                className="rounded-2xl w-[203px] tablet:w-[198.75px] desktop:w-[256px] h-[192px] object-cover"
                            />
                        </div>
                    )) 
                } 
            </div>
            <button className="bg-transparent hover:bg-custom-gray text-secondary-blue font-semibold py-2 px-4 border border-secondary-blue">See All</button>
        </div>
    </div>
    )
};