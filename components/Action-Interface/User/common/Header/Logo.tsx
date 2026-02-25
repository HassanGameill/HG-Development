"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import lightlogo from "../../../../../public/logos/hg-dev-1.png";
import darklogo from "../../../../../public/logos/hg-dev-2.png";
import Link from "@/components/common/Link";
const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="">
      <Link href="/" className="inline-block" aria-label="Go Summit">
        <div className="w-[52px] h-[52px] lg:w-[55px] lg:h-[55px] bg-white border-4 border-gray-200 dark:bg-blue-900/20 rounded-full  dark:shadow-xl shadow-md  dark:shadow-blue-900/30 flex items-center justify-center  dark:border  dark:border-blue-800/50 mx-auto md:mx-0">
          <Image
            src={theme === "light" ? lightlogo : darklogo}
            alt="GO Summit Logo"
            className=" transition-all duration-700 hover:rotate-6 hover:scale-105"
            width={42}
            height={42}
            priority
            loading="eager"
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
