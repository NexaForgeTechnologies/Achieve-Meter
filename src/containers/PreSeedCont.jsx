import BtnOne from "@/components/BtnOne";

export default function PreSeedCont() {
    return (
        <>
            <section className="bg-[#E5B3521A] rounded-2xl py-8 my-18 grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center items-start md:pr-5 gap-y-3 p-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start max-w-170 text-black">
                        Currently Raising
                    </h1>

                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-start max-w-170 text-black">
                        <span className="inline-flex flex-col items-start font-bold font-montserrat">
                            Pre-Seed
                            <img src="/slash.png" alt="lines" className="max-w-40 md:max-w-45" />
                        </span>
                    </h1>

                    <h1 className="font-inter text-[black] text-start text-sm text-[16px] font-semibold max-w-130">
                        Strategic partners and aligned capital
                    </h1>


                    <ul className="flex flex-col gap-y-2 text-[#C2C2C2]">
                        <li className={`flex items-start gap-x-2 mr-1`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                Be part of building a platform that scales from intern to boardroom
                            </p>
                        </li>
                        <li className={`flex items-start gap-x-2 mr-1`}>
                            <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                            <p className="text-xs md:text-base text-[#808080] relative -top-1">
                                Investor deck, roadmap, and TAM analysis available on request
                            </p>
                        </li>
                    </ul>

                    <div className="flex gap-x-1.5 md:gap-x-2 md:flex-col lg:flex-row gap-y-2">
                        <BtnOne name={"Request Investor Pack"} />

                        <BtnOne name={"Book a Founder Call"}
                            bgColor="bg-transparent"
                            textColor="text-[#CD8A33]"
                        />
                    </div>
                </div>

                <div className="p-5">
                    <img src="/seed.png" alt="" className="w-full" />
                </div>
            </section>
        </>
    );
}