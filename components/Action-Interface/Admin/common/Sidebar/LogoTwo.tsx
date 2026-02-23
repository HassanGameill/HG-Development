"use client";
import React from "react";
import Image from "next/image";
import lightlogo from "@/public/logos/hg-dev-1.png";
import darklogo from "../../../../../public/logos/hg-dev-2.png";

const LogoTwo = () => {

  return (
    <div className="mt-40 bg-white p-2 shadow-sm rounded-lg  dark:shadow-lg shadow-blue-500 dark:shadow-gray-500">
          <Image
            src={lightlogo}
            width={100}
            height={100}
            alt="markup-logo"
            className="w-[100px] m-auto"
          />
        </div>
      
  );
};

export default LogoTwo;
