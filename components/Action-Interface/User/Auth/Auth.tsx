import { TAuthRoute } from "@/types/authTypes";
import AuthModel from "@/components/common/Model/AuthModel";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Sign-Up/RegisterForm";
import SocialAuthButtons from "./SocialAuth/SocialAuthButtons";
import Verification from "./OTP-Verification/Verification";
import {  useState } from "react";
import Profile from "../common/Profile/Profile";


type TAuth = {
  route: TAuthRoute;
  setRoute: (route: TAuthRoute) => void;
};

const Auth = ({ route,  setRoute }: TAuth) => {
    const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <Profile setOpen={() => setOpen(true)} />

      {/* Modal */}
      <AuthModel
        open={open} onClose={() => setOpen(false)}
        setRoute={() => setRoute("login")}
      >
        {/* Route-based rendering */}
        {route === "login" && <LoginForm setOpen={() => setOpen(false)} setRoute={setRoute} />}
        {route === "register" && <RegisterForm setRoute={setRoute} />}
        {route === "verification" && <Verification setRoute={setRoute} />}

        {/* Social Auth */}
        {route !== "verification" && (
          <div className="text-center py-2">
            <div className="text-xs py-4">Or Join With Social Auth</div>
            <SocialAuthButtons />
          </div>
        )}

        {/* Switch Login/Register */}
        {route !== "verification" && (
          <div className="text-[12px] mt-4 text-center text-blue-950 dark:text-gray-400">
            {route === "login" ? (
              <button onClick={() => setRoute("register")}>
                Don’t have an account?{" "}
                <span className="font-semibold underline text-blue-800">
                  Register
                </span>
              </button>
            ) : (
              <button onClick={() => setRoute("login")}>
                Already have an account?{" "}
                <span className="font-semibold underline text-blue-800">
                  Login
                </span>
              </button>
            )}
          </div>
        )}
      </AuthModel>
    </>
  );
};

export default Auth;
