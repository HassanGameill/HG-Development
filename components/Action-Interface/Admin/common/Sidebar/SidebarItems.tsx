"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LucideIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

interface SidebarItemsProps {
  icon: LucideIcon;
  name: string;
  href: string;
  nestedLinks?: { name: string; href: string; icon: LucideIcon }[];
}

interface NestedLink {
  name: string;
  href: string;
  icon: LucideIcon;
  nestedLinks?: NestedLink[];
}

export default function SidebarItems({
  icon: Icon,
  name,
  href,
  nestedLinks,
}: SidebarItemsProps) {
   const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const cleanPath = pathname.replace(`/${locale}`, "");

  // Recursive function to check if route is active
  const isRouteActive = (links?: NestedLink[]): boolean => {
    if (!links) return false;
    return links.some((link) => {
      const active =
        cleanPath === link.href || cleanPath.startsWith(`${link.href}/`);
      return active || isRouteActive(link.nestedLinks);
    });
  };

  const isActiveParent =
    cleanPath === href ||
    cleanPath.startsWith(`${href}/`) ||
    isRouteActive(nestedLinks);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isActiveParent);
  }, [isActiveParent]);

  const onToggle = () => {
    if (nestedLinks) setOpen((prev) => !prev);
    else router.push(href);
  };


  return (
    <div className="relative flex flex-col w-full">
      {/* Parent Button */}
      <button
        onClick={onToggle}
        className={cn(
          "relative flex items-center justify-between w-full px-5 py-2.5 my-2 rounded-xl select-none group transition-all duration-200",
          "hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:shadow-sm hover:backdrop-blur-xl",
          isActiveParent &&
            "bg-sky-100/50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 shadow-sm"
        )}
      >
        {/* ICON + NAME */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: isActiveParent ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 270, damping: 18 }}
          >
            <Icon
              size={20}
              className={cn(
                "transition-colors",
                isActiveParent
                  ? "text-sky-600 dark:text-sky-300"
                  : "text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white"
              )}
            />
          </motion.div>

          <span
            className={cn(
              "text-[13px] font-medium transition-colors",
              isActiveParent
                ? "text-sky-700 dark:text-sky-300"
                : "text-slate-700 dark:text-slate-300"
            )}
          >
            {name}
          </span>
        </div>

        {/* CHEVRON */}
        {nestedLinks && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
          </motion.div>
        )}
      </button>

      {/* NESTED LINKS */}
      {nestedLinks && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -6 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "mt-1 flex flex-col overflow-hidden border-slate-200 dark:border-slate-700",
                locale === "en" ? "ml-7 pl-2 border-l" : "mr-5 pr-2 border-r"
              )}
            >
              {nestedLinks.map((child) => {
                const ChildIcon = child.icon;

                const childActive =
                  cleanPath === child.href ||
                  cleanPath.startsWith(`${child.href}/`);

                return (
                  <motion.button
                    key={child.href}
                    onClick={() => router.push(child.href)}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    className={cn(
                      "flex items-center gap-3 py-2 px-2 rounded-lg text-sm transition-all",
                      "hover:bg-slate-100/70 dark:hover:bg-slate-800/40",
                      childActive &&
                        "bg-sky-200/70 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 font-medium"
                    )}
                  >
                    <ChildIcon
                      size={18}
                      className={cn(
                        "transition-colors duration-200",
                        childActive
                          ? "text-sky-600 dark:text-sky-300"
                          : "text-slate-500"
                      )}
                    />
                    <span className="text-[12.5px]">{child.name}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
