"use client";
import { useLocale } from "next-intl";
import ThemeToggler from "@/components/common/ThemsToggle/ThemeToggler";
import LocalSelect from "@/components/common/LocaleSelect/LocalSelect";
import AuthClient from "@/components/Action-Interface/User/Auth/AuthClient";
import Logo from "../Sidebar/Logo";
import Notification from "@/components/Action-Interface/User/common/Notification/Notification";


const AdminHeader = () => {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 py-2 bg-white/95 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
      <div className="px-10 flex items-center justify-between">
        <Logo />
        <div className="hidden lg:block">
          <div className="  flex items-center gap-5">
            <ThemeToggler />
            <LocalSelect defaultValue={locale} />
            <Notification />
            <AuthClient />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
