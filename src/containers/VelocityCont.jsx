"use client";
import BtnOne from "@/components/BtnOne";
import useFormStore from "@/useFormStore";

export default function VelocityCont() {
    const {isOpen, setIsOpen} = useFormStore();
    return (
        <>
            <section className="bg-white pb-20">
                <section className="flex flex-col justify-center items-center gap-y-3 bg-gradient-to-r from-[#FCF6EE] to-[#B58A4C]/10 py-10 md:py-15 w-screen ml-[calc(50%-50vw)] px-5 sm:px-10 md:px-18 lg:px-20 relative">

                    <img src="/dots.png" alt="dots sheet" className="absolute right-5 md:right-13 top-5 md:top-7" />
                    <img src="/dots.png" alt="dots sheet" className="absolute left-5 md:left-13 bottom-25" />

                    <div className="flex flex-col justify-center items-center max-w-180 gap-y-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black text-center">
                            Ready to unlock career
                            <span className="font-bold mx-2">
                                velocity
                                for yourself
                            </span>
                            or your team?
                        </h1>

                        <p className="font-montserrat text-[black] font-normal text-center text-sm sm:text-md md:text-base  max-w-190">
                            Vision. Value. Velocity
                        </p>

                        <p className="font-montserrat text-[#808080] font-normal text-center text-sm sm:text-md md:text-base  max-w-190">
                            Achieve More. Accelerate Faster. Measure. Track. Achieve Success.
                        </p>

                        <div className="flex gap-x-1.5 md:gap-x-3 gap-y-2">
                            <BtnOne name={"Join the Waitlist – Individual"}
                            onClick={()=> setIsOpen(!isOpen)} />

                            <BtnOne name={"Join the Waitlist– Enterprise"}
                            onClick={()=> setIsOpen(!isOpen)}
                                bgColor="bg-transparent"
                                textColor="text-[#CD8A33]"
                            />
                        </div>

                        <p className="font-montserrat text-[#808080] font-normal text-center text-sm sm:text-md md:text-base max-w-190">
                            AchieveMeter is an Achiever Group Company
                        </p>
                    </div>
                </section>
            </section>
        </>
    );
}