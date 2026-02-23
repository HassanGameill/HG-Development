import Header from "@/components/Action-Interface/User/common/Header";
import { Metadata } from "next";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
  
}

export const metadata: Metadata = {
  title: {
    default: "Auth",
    template: "%s | Qasr Alsultan",
  },
  
};

function AuthLayout({ children }: IAdmin) {
  return (
    <main>
      <Header />
      <div className="">{children}</div>
    </main>
  );
}

export default AuthLayout;
