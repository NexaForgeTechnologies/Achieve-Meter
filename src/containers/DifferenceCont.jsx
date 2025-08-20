
export default function DifferenceCont() {
    return (
        <>
            <section className="flex flex-col gap-y-4 relative rounded-2xl pb-7 my-10">
                <div className="flex flex-col justify-center items-center pb-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal flex flex-wrap text-black">
                        The
                        <span className="font-bold mx-1">
                            AchieveMeter
                        </span>
                        Difference?
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/ai.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0"/>
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-xl ">
                            AI + Human-Led Growth
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/strategy.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0"/>
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-xl ">
                            Strategic Data + Daily Development
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/oval.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0"/>
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-xl ">
                           360° Insight — From Intern to Executive
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/progress.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0"/>
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-xl ">
                            Clear Progress. Real Impact. 
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}