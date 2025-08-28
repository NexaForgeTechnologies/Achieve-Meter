"use client";
import BtnOne from "@/components/BtnOne";
import useFormStore from "@/useFormStore";
import Link from "next/link";

export default function WhoItsForCont({ hide }) {
    const { isOpen, setIsOpen } = useFormStore();
    return (

        <>
            <section className="grid grid-cols-1 md:grid-cols-2 pb-15 gap-3">

                <div className="flex flex-col gap-y-5 py-10 md:pr-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-normal flex flex-wrap text-black">
                        Who
                        <span className="font-bold mx-1">
                            It's
                        </span>
                        For
                    </h1>

                    <ul className="flex flex-col gap-y-2 text-[#C2C2C2]">
                        <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                HR, People Ops & L&D Teams
                            </p>
                        </li>
                        <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                Talent & DEI Leads
                            </p>
                        </li>
                        <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                Heads of Function, Directors & CPOs
                            </p>
                        </li>
                        <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                Enterprise development and culture champions
                            </p>
                        </li>
                    </ul>

                    <h1 className="font-inter text-[black] text-start text-sm text-[16px] font-semibold max-w-130">
                        Join the Explore how AchieveMeter can power your talent
                        strategy. Now
                    </h1>

                    <div className="flex gap-x-1.5 md:gap-x-2 md:flex-col lg:flex-row gap-y-2">
                        <BtnOne name={"Join the Pilot Waitlist"}
                            onClick={() => setIsOpen(true)} />

                        <a href={"/AchieveMeter-Brochure.pdf"} download>
                            <BtnOne name={"Download Enterprise Overview"}
                                bgColor="bg-white"
                                textColor="text-[#CD8A33]"
                            />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <img src="/itsFor.png" alt="" className="w-full" />
                </div>
            </section>
        </>
    );
}