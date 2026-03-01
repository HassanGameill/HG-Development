"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggler from "@/components/common/ThemsToggle/ThemeToggler";
import LocalSelect from "@/components/common/LocaleSelect/LocalSelect";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Link from "@/components/common/Link";
import AuthClient from "../../Auth/AuthClient";

const NAV_LINKS = [
  { id: "home", titleEn: "Home", titleAr: "الرئيسية", href: "home" },
  { id: "about", titleEn: "About", titleAr: "عني", href: "about" },
  { id: "skills", titleEn: "Skills", titleAr: "المهارات", href: "skills" },
  { id: "projects", titleEn: "Projects", titleAr: "المشاريع", href: "projects" },
  { id: "experience", titleEn: "Experience", titleAr: "الخبرات", href: "experience" },
  { id: "contact", titleEn: "Contact", titleAr: "تواصل", href: "contact" },
];

export default function Navbar() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  /* ================= Scroll Spy ================= */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.href));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(sec => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  /* ================= Animations ================= */
  const menuVariants = {
    hidden: { x: locale === "en" ? "100%" : "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: locale === "en" ? "100%" : "-100%", opacity: 0 },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
  };

  return (
    <nav className="flex justify-end lg:bg-[#FCF8F8] lg:dark:bg-slate-800 lg:px-4 lg:py-1 lg:rounded-2xl">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center gap-4">
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
        <AuthClient />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex flex-row items-center gap-8">
        {NAV_LINKS.map(link => (
          <li key={link.id}>
            <Link
              href={`#${link.href}`}
              className={cn(
                "text-blue-900 text-shadow-sm dark:text-white hover:text-primary transition-colors duration-200 font-medium",
                active === link.href && "bg-primary px-2 rounded-lg hover:text-white text-white dark:text-blue-900"
              )}
              onClick={() => setActive(link.href)}
            >
              {locale === "en" ? link.titleEn : link.titleAr}
            </Link>
          </li>
        ))}
        <ThemeToggler />
      </ul>

      {/* Mobile Menu & Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className={cn(
                "fixed top-0 z-50 h-full w-4/5 sm:w-3/5 bg-background px-10 py-20 flex flex-col items-center gap-6",
                locale === "en" ? "right-0" : "left-0"
              )}
            >
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-6 right-6"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Link
                    href={`#${link.href}`}
                    onClick={() => {
                      setActive(link.href);
                      setOpen(false);
                    }}
                    className={cn(
                      "relative  text-lg font-medium  transition-colors",
                      active === link.href
                        ? "text-white bg-primary dark:text-slate-800 px-3 py-1 rounded-lg"
                        : "text-blue-900 dark:text-white hover:text-white"
                    )}
                  >
                    {locale === "en" ? link.titleEn : link.titleAr}
                  </Link>
                </motion.li>
              ))}

              <div className="flex items-center gap-4 mt-6">
                <LocalSelect defaultValue={locale} />
                <ThemeToggler />
              </div>
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}