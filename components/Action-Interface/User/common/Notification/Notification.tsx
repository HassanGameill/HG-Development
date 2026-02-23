import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <button
      aria-label="Notifications"
      className="
        relative flex items-center justify-center
        cursor-pointer rounded-lg p-2
        bg-amber-50 dark:bg-gray-700
        hover:bg-amber-100 dark:hover:bg-gray-600
        shadow-sm hover:shadow-md
        transition-all duration-200
      "
    >
      <IoMdNotificationsOutline className="text-lg text-slate-800 dark:text-gray-100" />

      {/* Notification Badge */}
      <div className="absolute -top-2 -right-2 border-2 border-white dark:border-slate-800 shadow-sm  bg-red-800 text-white text-[10px] px-1.5 rounded-full">
        <span className="text-xs">
          3
        </span>
      </div>
    </button>
  );
};

export default Notification;
