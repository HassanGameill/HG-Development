"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function WhatsUpLink() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();


  useEffect(() => {
    Aos.init({ duration: 2000 });
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className=" fixed bottom-8 left-8 z-[99]" data-aos="fade-up">
      {isVisible && (
        <Link href={"https://wa.me/+201021432599"}  target="_blank">
        <div
          aria-label="WhatsApp Link"
          className="relative flex h-10 w-10 lg:h-12 lg:w-12 cursor-pointer items-center justify-center rounded-full bg-green-900 dark:bg-white text-white dark:text-green-600  shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp group"
        >
          <span className="text-[2rem]">
            <FaWhatsapp />
          </span>

          {/* Improved Hover Message */}
          <span className="absolute  left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 lg:opacity-100 bg-white text-slate-800 text-[13px] px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:ml-6 whitespace-nowrap">
          {locale === "en" ? "Call Us Now" : "تواصل معنا الان"}      
            <span className="absolute top-1/2 left-[-6px] transform -translate-y-1/2 border-r-[10px] border-white border-y-[8px] border-y-transparent"></span>
          </span>
        </div>
        </Link>
      )}
      
    </div>
  );
}
