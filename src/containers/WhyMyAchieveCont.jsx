import BtnOne from "@/components/BtnOne";

export default function WhyMyAchieveCont() {
    return (
        <>
            <section className="grid grdi-cols-1 md:grid-cols-2 py-15 gap-5 md:gap-7">

                <div className=" flex items-center justify-center">
                    <img src="/why.png" alt="img" />
                </div>

                <div className="flex flex-col gap-y-4 py-10 md:row-start-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start text-black">
                        Why
                        <span className="inline-flex flex-col items-start font-bold ml-2">
                            MyAchieve?
                        </span>
                    </h1>


                    <ul className="flex flex-col gap-y-2 text-[#C2C2C2]">
                        <h1 className="font-inter text-[black] text-start text-sm text-[16px] font-semibold max-w-130">
                            Aligns your growth with your values, not just your job title
                        </h1>

                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                Blends AI precision + peer feedback
                            </p>
                        </li>
                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                Supports promotion, pivoting, or personal development
                            </p>
                        </li>
                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                100% private unless you choose to share or sync
                            </p>
                        </li>
                    </ul>

                    <ul className="flex flex-col gap-y-2 text-[#C2C2C2]">
                        <h1 className="font-inter text-[black] text-start text-sm text-[16px] font-semibold max-w-130">
                            Join the Waitlist Now
                        </h1>

                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                Be the first to access MyAchieve and unlock your future.
                            </p>
                        </li>
                    </ul>

                    <BtnOne
                        className={"max-w-80"}
                        name={"Sign Up – Individual Access"}
                    />
                </div>


                <div className="flex items-center justify-center">
                    <img src="/why2.png" alt="img" />
                </div>

                <div className="flex flex-col gap-y-4 py-10 lg:p-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start text-black">
                        For
                        <span className="inline-flex flex-col items-start font-bold ml-2">
                            Enterprise:
                        </span>
                    </h1>


                    <ul className="flex flex-col gap-y-2 text-[#C2C2C2]">
                        <h1 className="font-inter text-[black] text-start text-sm text-[16px] font-semibold max-w-130">
                            Your Workforce Development Accelerator
                        </h1>

                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                Not an LMS
                            </p>
                        </li>
                        <li className={`flex items-center gap-x-2 mr-1 `}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] ">
                                AchieveMeter enhances your people systems by accelerating
                                performance, potential, and wellbeing — in one intelligent layer.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}