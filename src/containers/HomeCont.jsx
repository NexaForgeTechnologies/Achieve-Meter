"use client";
import BtnOne from "@/components/BtnOne";
import useFormStore from "@/useFormStore";

export default function HomeCont() {
    const { isOpen, setIsOpen } = useFormStore();
    return (
        <>
            <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#FCF7EE] w-screen ml-[calc(50%-50vw)] px-5 sm:px-10 md:px-18 lg:px-20 py-10">

                <div className="flex flex-col justify-center items-start py-15 md:pr-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start pb-5 flex flex-col  max-w-120 text-black">
                        Achieve More.
                        <span className="inline-flex flex-col items-start font-bold">
                            Accelerate Faster.
                            <img src="/slash.png" alt="lines" className="max-w-45 md:max-w-100" />
                        </span>
                    </h1>

                    <div className="flex flex-col justify-center items-start gap-y-1">
                        <p className="font-inter text-[black] font-normal text-start text-sm sm:text-md md:text-lg max-w-130">
                            Measure. Track. Achieve Success.
                        </p>

                        <p className="font-inter text-[#808080] font-normal text-start text-sm sm:text-md md:text-lg max-w-130">
                            Your AI-powered career coach and workforce development
                            accelerator.
                        </p>

                        <p className="font-inter text-[#808080] font-normal text-start text-sm sm:text-md md:text-lg max-w-130">
                            Built for individuals and businesses ready to grow, lead, and
                            scale - with purpose and speed.
                        </p>
                    </div>

                    <div className="mt-3 md:mt-5">
                        <BtnOne name={"Join the Waitlist"} onClick={() => {setIsOpen(true);}}/>
                    </div>
                </div>


                <div className="relative">
                    <img src="/hero.png" alt="hero" className="w-full " />
                    <span className="absolute top-5 left-[20%] bg-[#E5B352] text-white px-3 md:px-5 rounded-full text-xs md:text-base">Vision</span>
                    <span className="absolute top-0 left-[43%] bg-[#E5B352] text-white px-3 md:px-5 rounded-full text-xs md:text-base">Value</span>
                    <span className="absolute top-5 right-[18%] bg-[#E5B352] text-white px-3 md:px-5 rounded-full text-xs md:text-base">Velocity</span>
                </div>
            </section>
        </>
    );
}