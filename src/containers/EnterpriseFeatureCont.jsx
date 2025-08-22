import EnterpriseFeatureComp from "@/components/EnterpriseFeatureComp";

export default function EnterpriseFeatureCont() {
    return (
        <>
            <section className="flex flex-col justify-center items-center relative bg-[#FCF7EE] rounded-2xl py-10 sm:py-15 px-5 md:pax-7 my-10">


                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center pb-8 -ml-3 text-black">
                    <span className="inline-flex flex-col items-center font-bold mr-2">
                        Core Enterprise
                        <img src="/slash.png" alt="lines" className="max-w-30 md:max-w-45" />
                    </span>
                    Features
                </h1>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
                    <EnterpriseFeatureComp
                        title={"Executive Dashboards"}
                        list1={"Track development velocity, promotion readiness, and coaching engagement in real time"}
                        list2={"Filter by department, function, or individual"}
                        list3={"Identify top performers, at-risk talent, and growth gaps"}
                        hide4={"hidden"} />


                    <EnterpriseFeatureComp
                        title={"AI-Powered Appraisal Suite"}
                        list1={"Auto-generated growth recommendations"}
                        list2={"Syncs with MyAchieve timelines"}
                        list3={"Bias flagging & reflection prompts"}
                        list4={"Skill gap insights + upskilling pathways"} />


                    <EnterpriseFeatureComp
                        title={"MyAchieve Sync (Opt-in)"}
                        list1={"Employees can share milestones, goals, and readiness scores"}
                        list2={"HR and Line Managers get a transparent view of growth"}
                        list3={"Enables internal mobility and targeted support"}
                        list4={"All data permission-based and GDPR aligned"} />


                    <EnterpriseFeatureComp
                        title={"Productivity & Risk Prediction"}
                        list1={"Detect early signs of burnout, disengagement, or development plateaus"}
                        list2={"Trigger nudges, escalations, or check-ins"}
                        list3={"Reduce turnover, increase performance continuity"}
                        hide4={"hidden"} />


                    <EnterpriseFeatureComp
                        title={"Embedded Mental Health Signals"}
                        list1={"Sentiment check-ins & red flag detection"}
                        list2={"Suggested interventions or wellbeing resources"}
                        list3={"Emotional intelligence nudges for managers"}
                        hide4={"hidden"} />

                    <EnterpriseFeatureComp
                        title={"Coaching & Mentoring Tracker"}
                        list1={"Auto Schedule and record coaching/development interactions"}
                        list2={"SLA dashboards (e.g., “Every employee had 1 coaching session this quarter”)"}
                        list3={"Identify line managers who need support"}
                        list4={"Auto identify and flag gaps in coaching"} />

                    <EnterpriseFeatureComp
                        title={"Learning Vault & KPI Sync"}
                        list1={"Map development to organisational KPIs"}
                        list2={"Track completion of internal learning outcomes"}
                        list3={"Build a strategic talent mobility map"}
                        hide4={"hidden"} />

                    <EnterpriseFeatureComp
                        title={"White-Label Options"}
                        list1={"Full custom branding"}
                        list2={"Executive and Boardroom-ready reporting"}
                        list3={"Branded onboarding and communication flows"}
                        list4={"API integrations with HRIS, LMS, calendar & performance tools"} />


                </section>
                <img src="/dots.png" alt="dots sheet" className="absolute right-2 md:right-5 top-5 md:top-5 " />
                <img src="/dots-vertical.png" alt="dots sheet" className="absolute left-3 bottom-25" />

            </section>
        </>
    );
}