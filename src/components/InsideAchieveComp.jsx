
export default function InsideAchieveComp({ 
    title, 
    description, 
    hide="hidden" }) {
    return (
        <>
            <div className="border border-[#B58A4C] bg-white text-[#808080] rounded-xl 
            flex justify-start items-start flex-col px-4 py-5 gap-y-3">

                <h1 className="text-[#B58A4C] text-lg md:text-2xl font-semibold">{title}</h1>
                <p className="font-inter">{description}</p>

                <ul className="flex flex-wrap gap-y-1 text-[#C2C2C2]">
                    <li className={`flex items-center gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs text-[#808080]">Endorse specific skills</p>
                    </li>
                    <li className={`flex items-center gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs text-[#808080]">Comment on growth, involvement, or achievements</p>
                    </li>
                    <li className={`flex items-center gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs text-[#808080]">Add qualitative impact to your timeline</p>
                    </li>
                </ul>
            </div>
        </>
    );
}