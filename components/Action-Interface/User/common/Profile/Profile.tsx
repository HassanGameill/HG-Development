"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import userAvatar from "@/public/icons/user.png";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import Link from "@/components/common/Link";
import { useLocale } from "next-intl";

type TProfile = {
  setOpen: (open: boolean) => void;
};

const Profile = ({ setOpen }: TProfile) => {
  const user = useSelector((state: any) => state.auth.user);
  const [socialAuth, { isSuccess, isError, error }] = useSocialAuthMutation();
  const { data: session } = useSession();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  console.log("USER", user);

  const locale = useLocale();
  const isEn = locale === "en";
  const avatarSrc = user?.avatar?.url?.trim() || userAvatar;

  // Sync NextAuth session with Redux
  useEffect(() => {
    if (!user && session?.user?.email) {
      socialAuth({
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
      });
    }

    if (session === null) {
      setLogout(true);
    }
  }, [session, user, socialAuth]);

  return (
    <>
      {user ? (
        <Link href="/profile">
          <Image
            src={avatarSrc}
            alt="user-avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer object-cover"
          />
        </Link>
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer flex items-center bg-primary dark:bg-gray-700 
          rounded-full p-2 hover:bg-primary/50 dark:hover:bg-gray-600  
          shadow-xl transition"
        >
          <CiUser className="text-[19px] text-white dark:text-gray-100 " />
        </div>
      )}
    </>
  );
};

export default Profile;
