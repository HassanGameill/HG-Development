import ReduxProvider from "@/app/providers/ReduxProvider";
import { TanstackProvider } from "@/app/providers/TanstackProvider";
import AdminHeader from "@/components/Action-Interface/Admin/common/AdminHeader";
import Sidebar from "@/components/Action-Interface/Admin/common/Sidebar/Sidebar";
import Header from "@/components/Action-Interface/User/common/Header";
import { redirect } from "@/i18n/routing";
import getCurrentUser from "@/lib/getCurrentUser";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

const MainLayout = async ({ children }: IAdmin) => {
  const currentUser = await getCurrentUser();
  console.log("USER_ADMIN", currentUser);

  if (!currentUser) {
    redirect({
      href: `/`,
      locale: "en",
    });
    return null;
  }

  return (
    <TanstackProvider>
      <ReduxProvider>
        <div className="h-screen w-full flex overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:flex h-full w-56 flex-col shadow-sm">
            <Sidebar />
          </aside>

          {/* Right Side */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Header */}
            <div className="shrink-0">
              <AdminHeader />
            </div>

            {/* ONLY THIS SCROLLS */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
              {children}
            </main>
          </div>
        </div>









        
      </ReduxProvider>
    </TanstackProvider>
  );
};

export default MainLayout;
