"use client";
import { getLocale } from "next-intl/server";
import { THero } from "./heroType";
import CustomImage from "@/components/common/CustomImage";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  imagesData: THero;
}

// Make the component async
const HeroImage = ({ imagesData }: ProductCardProps) => {
  const { heroImages } = imagesData;

  const mainImage = heroImages?.[0];

  return (
    <div className="relative order-1 lg:order-2 w-full sm:h-72 h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden animate-fadeIn">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className=" relative w-[80%] mt-10 lg:mt-20 m-auto aspect-square 
                                rounded-3xl overflow-hidden
                                border border-white/10 bg-surface 
                                backdrop-blur-sm "
      >
        <Image
          src={mainImage.url}
          alt="User Avatar"
          fill
          priority={true} // Optimizes loading if above the fold
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-500 ease-in-out 
               scale-105 group-hover:scale-100 brightness-95 
               group-hover:brightness-100"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
          }}
          className="absolute bottom-8 left-8"
        >
          <div className="text-2xl font-bold text-content bg-slate-800/30 rounded-lg shadow-md px-5 py-2"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroImage;
