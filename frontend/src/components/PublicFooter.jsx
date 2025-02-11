
export default function PublicFooter() {
    return(
          <div className = "Footer">
              <div className="w-full h-[280px] flex flex-col row-start-2 items-center gap-4 tablet:gap-9 py-4 px-6 tablet:px-[50px] desktop:px-[160px] tablet:py-8 desktop:py-16 justify-center bg-footer-back text-white font-montserrat ">
                <div className = "flex items-center justify-center gap-2 tablet:flex-row">
                  <div className = "flex items-center justify-center w-[52px] h-[52px]">
                    <img
                        src="/Facebook.png"
                        width={32}
                        height={32}
                        alt="Facebook"
                        className="w-8 h-8 object-cover"
                    />
                  </div>
                  <div className = "flex items-center justify-center w-[52px] h-[52px]"> 
                  <img
                        src="/LinkedIn.png"
                        width={32}
                        height={32}
                        alt="LinkedIn"
                        className="w-8 h-8 object-cover"
                    />
                  </div>
                  <div className = "flex items-center justify-center w-[52px] h-[52px]">
                  <img
                        src="/Instagram.png"
                        width={32}
                        height={32}
                        alt="Instagram"
                        className="w-8 h-8 object-cover"
                    />
                  </div>
                </div>
                <div className = "flex items-center justify-center gap-[18px] flex-col">
                  <div className="text-3xl text-white font-bold font-lora leading-[31px] text-center">Delta Chi Fraternity at CSU East Bay</div>
                  <div className="text-sm text-[#E0E0E0] leading-[14px] text-center">
                    25800 Carlos Bee Boulevard | Hayward, CA 94542 | 510-885-3000
                  </div>
                </div>
            </div>
          </div>
          )
};