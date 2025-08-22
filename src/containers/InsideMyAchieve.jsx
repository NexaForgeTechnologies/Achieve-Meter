import InsideAchieveComp from "@/components/InsideAchieveComp";

export default function InsideMyAchieve() {
    return (
        <section className="flex flex-col justify-center items-center relative bg-[#FCF7EE] rounded-2xl py-10 sm:py-15 px-5 md:pax-7 my-10">

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center pb-5 -ml-3 text-black">
                What's Inside{" "}
                <span className="inline-flex flex-col items-center font-bold">
                    MyAchieve
                    <img src="/slash.png" alt="lines" className="max-w-30 md:max-w-45" />
                </span>
            </h1>

            <img src="/dots.png" alt="dots sheet" className="absolute right-2 md:right-5 top-5 md:top-5" />
            <img src="/dots-vertical.png" alt="dots sheet" className="absolute left-3 bottom-25" />

            <section className="z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5">
                    <InsideAchieveComp
                        title={"Career Milestone Mapping"}
                        description={"Map your journey by role, level, and aspirations — e.g., Analyst → Manager → Director → CPO."} />
                    <InsideAchieveComp
                        title={"Values & Discipline Tracker"}
                        description={"Define your core values. Let them guide your growth, actions, and decisions."} />
                    <InsideAchieveComp
                        title={"Progress Dashboard"}
                        description={"Track everything that matters — completed tasks, learned skills, challenges overcome."} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                    <InsideAchieveComp
                        title={"Promotion Readiness Score"}
                        description={"See your readiness in real-time. AchieveMeter evaluates progress, potential, and momentum."} />

                    <InsideAchieveComp
                        title={"AI Bootcamps (30/60/90Days)"}
                        description={"Targeted career accelerators, designed by level and goal — delivered in daily/weekly nudges."} />
                        
                    <InsideAchieveComp
                        title={"Sync with Employer (Optional)"}
                        description={"Share selected goals or progress with your line manager - only if your employer also uses AchieveMeter."} />
                        
                    <InsideAchieveComp
                        title={"Emotional & Coaching Support"}
                        description={"Private check-ins, mental health tracking, and access to coaching tools and self-reflection prompts."} />
                        
                    <InsideAchieveComp
                        title={"Peer Endorsements & Social Proof"}
                        description={"Invite trusted peers, mentors, and colleagues to:"} 
                        hide="flex"/>
                        
                    <InsideAchieveComp
                        title={"Tracker"}
                        description={"Schedule and log coaching sessions, appraisals, and career chats — build your learning history"} />
                </div>
            </section>

        </section>
    );
}
