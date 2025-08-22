import TracksComp from "@/components/TracksComp";

export default function TwoTracksCont() {
    return (
        <>
        <section className="py-10 md:py-20">
            <section className="flex flex-col bg-[#FCF7EE] w-screen ml-[calc(50%-50vw)] px-5 sm:px-10 md:px-18 lg:px-20 py-15 gap-y-5">

                <div className="flex flex-col items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-start pb-5 flex flex-wrap max-w-120 gap-x-2 text-black">
                        <span className="inline-flex flex-col items-start font-bold">
                            Two Tracks.
                            <img src="/slash.png" alt="lines" className="max-w-30 md:max-w-45" />
                        </span>

                        One Purpose.
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TracksComp
                        img={"/enterprise.png"}
                        list1="Track talent velocity, readiness, and growth"
                        list2="Measure performance development at scale"
                        list3="Create a growth culture aligned with people-powered systems" />

                    <TracksComp
                        img={"/individual.png"}
                        list1="Track your goals, values, and milestones"
                        list2="Validate progress with peer endorsements"
                        list3="Sync with your employer (optional)" />

                </div>

            </section>
            </section>
        </>
    );
}