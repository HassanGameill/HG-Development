"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import lightlogo from "@/public/logos/hg-dev-1.png";
import darklogo from "../../../../../public/logos/hg-dev-2.png";

import Link from "@/components/common/Link";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="">
    <Link href="/" className="inline-block" aria-label="Mansour Sweets">
      <div className="w-[60px] lg:w-[60px] bg-white dark:bg-blue-900/20 rounded-2xl  shadow-xl dark:shadow-blue-900/30 flex items-center justify-center border border-gray-200 dark:border-blue-800/50 mx-auto md:mx-0">
        <Image
          src={theme === "light" ? lightlogo : darklogo}
          alt="Mansour Logo"
          className="w-full transition-all duration-700 hover:rotate-6 hover:scale-105"
          width={112}
          height={112}
          priority
          loading="eager"
        />
      </div>
    </Link>
    </div>
  );
};

export default Logo;
