// 'use client'

// import { useState } from "react";
// import { UserIcon } from "lucide-react";
// import RegisterForm from "../../Auth/Sign-Up/RegisterForm";
// import { CiUser } from "react-icons/ci";
// import LoginForm from "../../Auth/Login/LoginForm";
// import SocialAuthButtons from "../../Auth/SocialAuth/SocialAuthButtons";
// import VerificationCard from "../../Auth/Verification/Verification";
// import AuthModel from "@/components/common/Model/AuthModel";

// export const UserProfile = () => {
//   const [open, setOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <>
//       <div onClick={() => setOpen(true)} className="cursor-pointer lg:flex items-center bg-red-800 dark:bg-gray-900 
//       rounded-full p-2 hover:bg-red-900 dark:hover:bg-gray-700 
//       shadow-sm transition"
//     >
//       <CiUser className="text-[24px] text-white dark:text-gray-100" />
//       </div>

//       <AuthModel open={open} onClose={() => setOpen(false)}>
//         {isLogin ? <LoginForm setRoute={() => {}} /> : <RegisterForm setRoute={() => {}} />}

        

//         <div className="text-center py-2">

          
//           <div className="text-xs text-center  py-4">Or Join With Social Auth</div>
//           <SocialAuthButtons />
//         </div>

//         <div className="text-[12px] mt-4 text-center text-blue-950 dark:text-gray-400 hover:dark:text-gray-300">
//           {isLogin ? (
//             <button
//               onClick={() => setIsLogin(false)}
//               className="cursor-pointer"
//             >
//               Don’t have an account?{" "}
//               <span className="font-semibold underline text-blue-800">Register</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsLogin(true)}
//               className="cursor-pointer"
//             >
//               Already have an account?{" "}
//               <span className="font-semibold underline text-blue-800">Login</span>
//             </button>
//           )}
      
//         </div>

//         {/* <div className="">
//           <VerificationCard />
//         </div> */}

//       </AuthModel>
//     </>
//   );
// };
