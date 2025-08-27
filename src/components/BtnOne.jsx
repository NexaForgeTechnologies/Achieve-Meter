export default function BtnOne({
  name,
  bgColor = "bg-[#CD8A33]",
  hoverBgColor = "hover:bg-[#CD8A33]",
  textColor = "text-[white]",
  hoverTextColor = "hover:text-[white]",
  borderColor = "border-[#CD8A33]",
  className,
  onClick,
  typeSubmit,
  loading = false,
}) {
  return (
    <button
      disabled={loading}
      className={`${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor} ${borderColor} ${className} 
      border font-normal py-1.5 px-2 sm:px-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg 
      cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      type={typeSubmit}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Submitting...
        </span>
      ) : (
        name
      )}
    </button>
  );
}
