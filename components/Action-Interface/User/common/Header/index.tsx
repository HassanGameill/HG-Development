import LocalSelect from "@/components/common/LocaleSelect/LocalSelect";
import { useLocale } from "next-intl";
import Navbar from "./Navbar";
import Logo from "./Logo";

import AuthClient from "../../Auth/AuthClient";
import Notification from "../Notification/Notification";

const Header = () => {
  const locale = useLocale();

  return (
    <header className="sticky rounded-xl top-0 z-50 py-2 bg-white/95 dark:bg-slate-900/80  dark:shadow-md  ">
      <div className="container flex items-center justify-between">
        <Logo />
          <Navbar />
          <div className="hidden lg:block">
            <div className="  flex items-center gap-5">
              <LocalSelect defaultValue={locale} />
              <Notification />
              <AuthClient />
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;
