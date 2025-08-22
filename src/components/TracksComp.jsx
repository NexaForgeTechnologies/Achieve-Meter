
export default function TracksComp({ heading, list1, list2, list3, hide,img }) {
    return (
        <>
            <div className="border border-[#B58A4C] bg-white p-5 flex flex-col justify-between gap-y-3 rounded-xl">

                <div className="flex gap-x-3 md:py-2 items-center">
                    <img src={img} alt="icon" className="w-10 md:w-12 " />
                    <h1 className="text-[black] text-lg md:text-2xl font-semibold">{heading}</h1>
                </div>

                <ul className="flex flex-col gap-y-1 text-[#C2C2C2]">
                    <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs md:text-base text-[#808080] relative -top-1">{list1}</p>
                    </li>
                    <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs md:text-base text-[#808080] relative -top-1">{list2}</p>
                    </li>
                    <li className={`flex items-start gap-x-2 mr-1 ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className="text-xs md:text-base text-[#808080] relative -top-1">{list3}</p>
                    </li>
                </ul>
            </div>
        </>
    );
}