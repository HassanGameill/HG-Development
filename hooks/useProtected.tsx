'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import useUserAuth from "./userAuth";

interface IProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: IProtectedProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    } else {
      router.replace("/profile");

    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return null; // or loader
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
