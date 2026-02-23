"use client";

import { TAuthRoute } from "@/types/authTypes";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useLocale } from "next-intl";
import { Fragment } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  setRoute: (route: TAuthRoute) => void;
}

const AuthModel = ({ open, onClose, children }: ModalProps) => {
  const locale = useLocale();

 return (
    <Transition show={open} appear as={Fragment}>
      <Dialog
        as="div"
        className={`relative  z-[999] ${locale === "ar" ? "__rtl_lang" : ""}`}
        onClose={onClose}
      >
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 " />
        </TransitionChild>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="bg-[#FBFBFB] dark:bg-slate-800 relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-xl  p-6 shadow-xl transition-all">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Modal"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-red-600 focus:ring-2 focus:ring-red-400"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Content (Scrollable on Small Screens) */}
              <div className=" max-h-[80vh] overflow-y-auto p-2 sm:p-4 text-shadow-xs">
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModel;
