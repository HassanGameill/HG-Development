import Image from "next/image";
import avatarDefault from "@/public/icons/user.png";
import { RiLockLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type User = {
  avatar?: { url: string } | null;
  name: string;
  role: string;
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
  const router = useRouter();
  const isAdmin = user?.role === "ADMIN";

  // Determine image source
  const imageSrc = user?.avatar?.url ?? avatar ?? avatarDefault;

  const userName = user?.name || "User";

  const menuItems = [
    { id: 1, label: userName, icon: null },
    { id: 2, label: "Change Password", icon: <RiLockLine size={20} /> },
    { id: 3, label: "Enrolled Courses", icon: <SiCoursera size={20} /> },

    // Admin menu item
    ...(isAdmin
      ? [
          {
            id: 5,
            label: "Admin Dashboard",
            icon: (
              <MdOutlineAdminPanelSettings className="text-red-700" size={20} />
            ),
            action: () => router.push(`/dashboard`),
          },
        ]
      : []),

    {
      id: 4,
      label: "Logout",
      icon: <IoLogOutOutline size={20} />,
      action: logoutHandler,
    },
  ];

  return (
    <div className="w-full">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`w-full flex items-center px-3 py-4 cursor-pointer  ${
            active === item.id ? "bg-slate-800 text-white" : "bg-transparent"
          }`}
          onClick={() => (item.action ? item.action() : setActive(item.id))}
        >
          {item.id === 1 ? (
            <Image
              src={imageSrc}
              alt="User avatar"
              width={30}
              height={30}
              className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full"
            />
          ) : (
            item.icon
          )}
          <span
            className={`px-2 800px:block hidden font-poppins dark:text-white text-blue-900 
              ${active === item.id ? "text-white" : ""}
              ${item.id === 5 && "text-red-800"}
              
              `}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SideBarProfile;
