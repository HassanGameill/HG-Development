"use client";

import { useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
// import ChangePassword from "./Password/ChangePassword";

type Props = {
  user: any;
};

const ProfileClient: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [active, setActive] = useState(1);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  // ✅ Scroll handler (safe & clean)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout Handler with loading
  const logoutHandler = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      toast.loading(isEn ? "Logging out..." : "جاري تسجيل الخروج");

      await signOut({ redirect: false });

      toast.dismiss();
      toast.success(isEn ? "Logout successful" : "تم تسجيل الخروج");

      router.push("/");
    } catch (error) {
      toast.dismiss();
      toast.error(isEn ? "Logout failed" : "فشل تسجيل الخروج");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-[85%] flex mx-auto">
      {/* Sidebar */}
      <div
        className={`w-[60%] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white shadow-xl bg-opacity-90 border border-gray-50 dark:border-slate-800 rounded-lg mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* Profile Info */}
      <div className="container mt-[80px] mb-[80px]">
        {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
        {/* {active === 2 && <ChangePassword avatar={avatar} user={user} />} */}
      </div>
    </div>
  );
};

export default ProfileClient;
