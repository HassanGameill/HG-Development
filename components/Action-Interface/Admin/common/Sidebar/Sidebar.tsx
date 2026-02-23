import React from "react";
import SidebarRoutes from "./SidebarRoutes";
import { useLocale } from "next-intl";
import Logo from "./Logo";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  const locale = useLocale();
  return (
    <div className="h-full pt-5 flex flex-col justify-between overflow-y-auto bg-white dark:bg-slate-800 shadow-sm">
      <div className="">
        <SidebarHeader />

        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>

      <div className="p-6 flex flex-col  ">
        {/* <div className="flex-start">
          <div className="">Settings</div>
          <div className="">Profile</div>
        </div> */}
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
