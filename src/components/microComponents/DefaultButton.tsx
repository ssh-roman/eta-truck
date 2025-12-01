import Link from "next/link";

const DefaultButton = ({ text, href, filled, color } : { text: string, href: string, filled?: boolean, color?: string}) => {
  // Determine classes based on the three states
  let buttonClasses = "";
  
  if (!filled && !color) {
    // State 1: Not filled, no color - outline style
    buttonClasses = "border border-[#FFECB8] text-[#FFECB8] hover:bg-[#FFECB8] hover:text-[#1D4E1A]";
  } else if (!filled && color === "blue") {
    // State 1: Not filled with blue color - blue outline style
    buttonClasses = "border border-[#212356] text-[#212356] hover:bg-[#212356] hover:text-[#FFECB8]";
  } else if (filled && !color) {
    // State 2: Filled, no color - default filled style
    buttonClasses = "bg-[#1B1E57] text-[#1D4E1A] hover:text-[#FFECB8] hover:bg-[#1D4E1A] hover:outline hover:outline-[#FFECB8]";
  } else if (filled && color === "blue") {
    // State 3: Filled with blue color
    buttonClasses = "bg-[#212356] text-[#FFF] hover:text-[#212356] hover:bg-transparent hover:outline hover:outline-[#212356]";
  }

  return (
    <Link href={href} className={`py-3 px-5 ${buttonClasses} cursor-pointer transition-colors duration-300 flex justify-center items-center w-fit whitespace-nowrap`}>
        {text}
    </Link>
  );
};

export default DefaultButton;