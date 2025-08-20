
export default function TwoAudienceCont() {
    return (
        <>
            <section className="py-0 md:py-10">
                <section className="flex flex-col w-screen ml-[calc(50%-50vw)] px-5 sm:px-10 md:px-18 lg:px-20 py-15 gap-y-5 items-center">

                    <div className="flex justify-center ">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start pb-3 flex flex-col sm:flex-row gap-x-2 text-black items-center">
                            AchieveMeter Serves
                            <span className="inline-flex flex-col items-start font-bold">
                                Two Audiences
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-center justify-center gap-x-6 md:gap-x-10 font-semibold">
                        <span className="flex gap-x-2 items-center text-black">
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0 inline-block`}></span>
                            For Individuals
                        </span>

                        <span className="flex gap-x-2 items-center text-black">
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0 inline-block`}></span>
                            For Enterprise
                        </span>
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="border border-[#B58A4C] bg-[#E5B3521A] p-5 flex flex-col justify-between gap-y-3 rounded-xl">

                            <div className="flex gap-x-5 md:py-2 items-center">
                                <img src="/enterprise.png" alt="icon" className="w-10 md:w-10 " />
                                <h1 className="text-[black] text-lg md:text-2xl font-semibold">For Enterprise</h1>
                            </div>

                            <ul className="flex flex-col gap-y-1 text-[#C2C2C2]">
                                <li className={`flex items-start gap-x-2 mr-1`}>
                                    <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                        Personal career coach - built-in acceleration with AI, structure, and
                                        social validation
                                    </p>
                                </li>
                                <li className={`flex items-start gap-x-2 mr-1`}>
                                    <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                        Organization-wide workforce development intelligence, without
                                        replacing your LMS
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="border border-[#B58A4C] bg-[#E5B3521A] p-5 flex flex-col justify-between gap-y-3 rounded-xl">

                            <div className="flex gap-x-5 md:py-2 items-center">
                                <img src="/individual.png" alt="icon" className="w-10 md:w-12 " />
                                <h1 className="text-[black] text-lg md:text-2xl font-semibold">For Individuals</h1>
                            </div>

                            <ul className="flex flex-col gap-y-1 text-[#C2C2C2]">
                                <li className={`flex items-start gap-x-2 mr-1`}>
                                    <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                        Unlock Your Potential with MyAchieve
                                    </p>
                                </li>
                                <li className={`flex items-start gap-x-2 mr-1`}>
                                    <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                        Your personal growth system
                                    </p>
                                </li>
                                <li className={`flex items-start gap-x-2 mr-1`}>
                                    <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                        Powered by AI. Shaped by your values. Backed by your peers
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>

                </section>
            </section>
        </>
    );
}