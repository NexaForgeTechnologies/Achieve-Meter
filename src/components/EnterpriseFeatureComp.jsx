
export default function EnterpriseFeatureComp({hide, hide4, title, list1, list2, list3, list4 }) {
    return (
        <>
            <div className="bg-white border border-[#B58A4C] rounded-xl flex justify-start items-start flex-col px-4 py-5 gap-y-3 text-[#808080]">
                
                <h1 className="text-[#B58A4C] text-lg md:text-2xl font-semibold">{title}</h1>

                <ul className="flex flex-wrap gap-y-1 text-[#C2C2C2]">
                    <li className={`flex items-start gap-x-2 mr-1  ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className=" text-[#808080] relative -top-2 text-md ">{list1}</p>
                    </li>
                    <li className={`flex items-start gap-x-2 mr-1  ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className=" text-[#808080] relative -top-2 text-md ">{list2}</p>
                    </li>
                    <li className={`flex items-start gap-x-2 mr-1  ${hide}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className=" text-[#808080] relative -top-2 text-md ">{list3}</p>
                    </li>
                    <li className={`flex items-start gap-x-2 mr-1  ${hide4}`}>
                        <span className={`bg-[#CD8A33] rounded-full w-2 h-2 flex-shrink-0`}></span>
                        <p className=" text-[#808080] relative -top-2 text-md ">{list4}</p>
                    </li>
                </ul>
            </div>
        </>
    );
}