"use client"
import { useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any
}

const ProfileClient: React.FC<Props> = ({user}) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const route = useRouter()

  const locale = useLocale();
    const isEn = locale === "en";


    const [active, setActive] = useState(1);

    const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
    })


//   ____ Logout Handler ______
const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    route.push("/");
    toast.success( isEn ? "Logout successful" : "تم تسجيل الخروج");
}

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60%] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white shadow-xl bg-opacity-90 border border-gray-50   dark:border-slate-800 rounded-lg dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-{30px}`}
      >

        <SideBarProfile 
           user={user}
           active={active}
           avatar={avatar}
           setActive={setActive}
           logoutHandler={logoutHandler}
        />

      </div>

      <div className="container mt-[80px] mb-[80px]">
         {
          active === 1 && (
            <ProfileInfo 
              avatar={avatar} 
              user={user} 
            
            />
          )
        }
      </div>

     
    </div>
  );
};

export default ProfileClient;
