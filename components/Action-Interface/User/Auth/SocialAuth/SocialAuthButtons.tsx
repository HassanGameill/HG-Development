"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Provider = "google" | "facebook";

export default function SocialAuthButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const locale = useLocale();
  const isEn = locale === "en";

  const handleSignIn = async (provider: Provider) => {
    try {
      setLoading(provider);
      await signIn(provider);
      toast.success(isEn ? "Login successful!" : "تم تسجيل الدخول بنجاح!");

    } catch (error) {
      console.error("Social login error:", error);
      setLoading(null);
    }
  };

  const baseBtn =
    "group flex items-center justify-center gap-3 w-full h-11 rounded-xl border text-xs font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Google */}
      <button
        type="button"
        onClick={() => handleSignIn("google")}
        disabled={loading !== null}
        aria-label="Continue with Google"
        className={`${baseBtn}
          bg-white dark:bg-gray-900
          border-gray-300 dark:border-gray-700
          text-gray-700 dark:text-gray-200
          hover:shadow-md hover:-translate-y-[1px]
          focus:ring-gray-400
        `}
      >
        {loading === "google" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEn ? "Connecting..." : "جارٍ الاتصال..."}</span>
          </>
        ) : (
          <>
            <FcGoogle className="text-lg" />
            <span>
              {isEn ? "Continue with Google" : "المتابعة باستخدام Google"}
            </span>
          </>
        )}
      </button>

      {/* Facebook (ready when enabled) */}
      {/* 
      <button
        type="button"
        onClick={() => handleSignIn("facebook")}
        disabled={loading !== null}
        aria-label="Continue with Facebook"
        className={`${baseBtn}
          bg-white dark:bg-gray-900
          border-gray-300 dark:border-gray-700
          text-gray-700 dark:text-gray-200
          hover:shadow-md hover:-translate-y-[1px]
          focus:ring-blue-500
        `}
      >
        {loading === "facebook" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEn ? "Connecting..." : "جارٍ الاتصال..."}</span>
          </>
        ) : (
          <>
            <FaFacebookF className="text-lg text-blue-600" />
            <span>{isEn ? "Facebook" : "فيسبوك"}</span>
          </>
        )}
      </button>
      */}
    </div>
  );
}
