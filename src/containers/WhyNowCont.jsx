
export default function WhyNowCont() {
    return (
        <>
            <section className="flex flex-col gap-y-4 relative rounded-2xl py-10 my-10">
                <div className="flex flex-col justify-center items-center pb-3 gap-y-3 md:gap-y-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal flex flex-wrap text-black">
                        Why
                        <span className="font-bold mx-1">
                            Now?
                        </span>
                    </h1>

                    <p className="font-montserrat text-[black] font-semibold text-center text-sm sm:text-md md:text-base  max-w-190">
                        Career transformation is global, constant, and underserved by outdated tools
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/ai.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0" />
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-lg ">
                            Our AI model doesn't just track — it guides, predicts, and
                            accelerates
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/revenue.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0" />
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-lg ">
                            Dual revenue streams: B2C (subscriptions) + B2B
                            (enterprise licensing, white-labelling)
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/integration.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0" />
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-lg ">
                            Deep integration potential with HR tech, coaching
                            platforms, and performance tools
                        </p>
                    </div>

                    <div className="border border-[#B58A4C] bg-[#FCF7EE] flex flex-row items-center rounded-lg px-5 py-3 sm:py-5 gap-x-4 min-h-16">
                        <img src="/partnerships.png" alt="ai" className="w-7 sm:w-10 md:w-11 flex-shrink-0" />
                        <p className="font-inter text-black font-semibold text-start text-sm sm:text-md lg:text-lg ">
                            Enterprise pilots + partnerships under development
                        </p>
                    </div>

                </div>
            </section>

        </>
    );
}