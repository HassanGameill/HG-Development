import Image from "next/image";
import avatarDefault from "@/public/icons/user.png";
import { RiLockLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocale } from "next-intl";

type User = {
  avatar?: { url: string } | null;
  name: string;
};

type Props = {
  user?: User;
  active: number;
  avatar?: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
};

const SideBarProfile: React.FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  const locale = useLocale();
  const isEn = locale === "en";

  // Determine image source
  const imageSrc =
    user?.avatar?.url || avatar || avatarDefault;

    const userName = user?.name


  const menuItems = [
    { id: 1, label: userName, icon: null },
    { id: 2, label: "Change Password", icon: <RiLockLine size={20} /> },
    { id: 3, label: "Enrolled Courses", icon: <SiCoursera size={20} /> },
    { id: 4, label: "Logout", icon: <IoLogOutOutline size={20} />, action: logoutHandler },
  ];

  return (
    <div className="w-full">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === item.id ? "bg-slate-300" : "bg-transparent"
          }`}
          onClick={() => (item.action ? item.action() : setActive(item.id))}
        >
          {item.id === 1 ? (
            <Image
              src={imageSrc}
              alt="User avatar"
              width={100}
              height={100}
              className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full"
            />
          ) : (
            item.icon
          )}
          <span className="px-2 800px:block hidden font-poppins dark:text-white text-blue-900">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SideBarProfile;
