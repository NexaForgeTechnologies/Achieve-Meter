
export default function ForIndividualsCont() {
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex justify-start md:justify-center flex-col gap-y-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start 
                     flex-col sm:flex-row gap-x-2 text-black items-center inline-block">
                        For
                        <span className="mx-1.5 font-bold">
                            Individuals :
                        </span>
                    </h1>

                    <div className="flex flex-col gap-y-3">
                        <h1 className="flex gap-x-2 items-center text-black font-semibold">
                            Your Potential with MyAchieve
                        </h1>

                        <span className="flex gap-x-2 items-center text-[#808080]">
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0 inline-block`}></span>
                            Your Potential with MyAchieve
                        </span>

                        <span className="flex gap-x-2 items-start text-[#808080]">
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0 inline-block `}></span>
                            <span className="relative -top-2">
                                Powered by AI. Shaped by your values. Backed by your peers.
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-center p-10">
                    <img src="/indivi.png" alt="" />
                </div>
            </section>
        </>
    );
}