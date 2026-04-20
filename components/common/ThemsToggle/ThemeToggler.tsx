"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Detect direction from <html dir="rtl">
    const dir = document.documentElement.dir;
    setIsRTL(dir === "rtl");
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  if (!mounted) return null;

  // 🔥 Flip movement based on direction
  const translateX = isRTL
    ? isDark
      ? -28
      : 0
    : isDark
    ? 28
    : 0;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-16 h-9 rounded-full px-1 flex items-center
        bg-slate-200 dark:bg-slate-700
        transition-colors duration-300 cursor-pointer"
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className="w-4 h-4 text-yellow-500" />
        <Moon className="w-4 h-4 text-slate-300" />
      </div>

      {/* Sliding Knob */}
      <motion.div
        animate={{ x: translateX }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-7 h-7 rounded-full bg-white dark:bg-slate-900 shadow-md z-10 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-slate-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
}