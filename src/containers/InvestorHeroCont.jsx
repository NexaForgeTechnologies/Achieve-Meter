
export default function InvestorHeroCont() {
    return (
        <>
            <section className="bg-[#E5B3521A] w-screen ml-[calc(50%-50vw)] px-5 sm:px-10 md:px-18 lg:px-20">
               
                <div className="flex flex-col justify-center items-center py-15 md:pr-5 gap-y-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-170 text-black">
                            Join Us at the Ground
                        </h1>
                        
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-170 text-black">
                            <span className="inline-flex flex-col items-center font-bold mx-1.5">

                                Level of Career
                                <img src="/slash.png" alt="lines" className="max-w-40 md:max-w-90" />
                            </span>
                            Acceleration
                        </h1>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-y-3">
                        <p className="font-montserrat text-[black] font-semibold text-center text-sm sm:text-md md:text-base ">
                            We are not building another LMS.
                        </p>

                        <p className="font-inter text-[#808080] font-normal text-center text-sm sm:text-md md:text-base lg:text-lg max-w-190">
                            AchieveMeter is redefining how individuals and enterprises grow — not through static
                            training, but through AI-driven performance, purpose, and measurable velocity.
                        </p>

                        <p className="font-inter text-[#808080] font-normal text-center text-sm sm:text-md md:text-base lg:text-lg max-w-190">
                            We are building the next-generation Workforce Development Ecosystem - scalable, data-rich, and
                            deeply human.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}