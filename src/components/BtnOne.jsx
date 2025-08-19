export default function BtnOne({ 
    name, 
    bgColor = "bg-[#CD8A33]",
    hoverBgColor = "bg-[#DFAA4A]",
    textColor = "text-[white]",
    hoverTextColor = "text-[#CD8A33]", }) {
    return (
        <button
            className={`${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor} font-normal py-2 px-4 rounded-full text-sm sm:text-base md:text-lg lg:text-xl`}
            >
                {name}
            </button>
    );
}