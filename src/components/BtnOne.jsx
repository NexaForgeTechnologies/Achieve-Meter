export default function BtnOne({
    name,
    bgColor = "bg-[#CD8A33]",
    hoverBgColor = "hover:bg-[#CD8A33]",
    textColor = "text-[white]",
    hoverTextColor = "hover:text-[white]",
    borderColor = "border-[#CD8A33]",
    className,
    onClick,
    typeSubmit
}) {
    return (
        <button
            className={`${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor} ${borderColor} ${className} border font-normal py-1.5 px-2 sm:px-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer`}
            onClick={onClick}
            type={typeSubmit}
        >
            {name}
        </button>
    );
}