'use client'
import Image from "next/image";
import lightlogo from "@/public/logos/hg-dev-1.png";
import darklogo from "@/public/logos/hg-dev-2.png";
import { useTheme } from "next-themes";


interface IHeadingProps {
  title: string;
  description?: string;
}

const Heading: React.FC<IHeadingProps> = ({ title, description }) => {
    const { theme } = useTheme();

  
  
  return (
    <div className="flex items-center  gap-4">
      <div className="w-[50px] md:w-[60px] bg-white  dark:bg-blue-900/20  rounded-lg flex items-center justify-center shadow-md  dark:shadow-blue-900/30  border-2 border-gray-200 dark:border-blue-800/50 ">
        <Image
          src={theme === "light" ? lightlogo : darklogo}
          alt="logo"
          width={400}
          height={400}
          className="w-full transition-all duration-700 hover:rotate-6 hover:scale-105 cursor-pointer"
        />
      </div>
      <div className="">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide">{title}</h2>
        <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
