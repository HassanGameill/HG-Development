import ReduxInitializer from "@/app/providers/ReduxInitializer";
import ReduxProvider from "@/app/providers/ReduxProvider";
import { TanstackProvider } from "@/app/providers/TanstackProvider";
import Header from "@/components/Action-Interface/User/common/Header";
import WhatsUpLink from "@/components/Action-Interface/User/common/StableLinks/WhatsUpLink/WhatsUpLink";
import Footer from "@/components/common/footer";
import { ReactNode } from "react";

interface IRootPage {
  children: ReactNode;
}

const MainLayout = async ({ children }: IRootPage) => {
  return (
    <TanstackProvider>
      <ReduxProvider>
        <ReduxInitializer />
        <Header />
        {children}
        <WhatsUpLink />
        <Footer />
      </ReduxProvider>
    </TanstackProvider>
  );
};

export default MainLayout;
