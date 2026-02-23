// import { useLocale } from 'next-intl';
// import Image from 'next/image';
// import { motion, AnimatePresence } from "framer-motion";

// const ProfileMenu = () => {
//     const locale = useLocale()
//   return (
//     <div className="relative" dir={locale === "ar" ? "rtl" : "ltr"}>
  
     

//       {/* Dropdown */}
//       <AnimatePresence>
        
//           <motion.div
//             ref={popupRef}
//             initial={{ opacity: 0, scale: 0.93, y: -5 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.93, y: -5 }}
//             transition={{ duration: 0.16, ease: "easeOut" }}
//             className={`absolute top-14 z-50 w-64 
//               bg-white/95 dark:bg-gray-900/95
//               backdrop-blur-xl 
//               border border-gray-200/60 dark:border-gray-700/60
//               shadow-2xl rounded-2xl p-4
//               ${locale === "ar" ? "left-0" : "right-0"}`}
//           >
//             {/* User Info */}
//             <div className="flex items-center gap-3 pb-3 border-b border-gray-300/50 dark:border-gray-700/50">
//               {/* Avatar Small */}
//               <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
//                 {session?.user?.image ? (
//                   <Image
//                     src={session.user.image}
//                     width={40}
//                     height={40}
//                     alt="User Avatar"
//                     className="object-cover rounded-full"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full w-full bg-primary text-white font-semibold">
//                     {session?.user?.name?.charAt(0)}
//                   </div>
//                 )}
//               </div>

//               {/* Name & Email */}
//               <div className="flex flex-col">
//                 <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
//                   {session?.user?.name}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {session?.user?.email}
//                 </p>
//               </div>
//             </div>

//             {/* Menu */}
//             <div className="mt-3 space-y-2">
//               {role === "USER" ? (
//                     <button
//                       onClick={() => {
//                         setIsPopupVisible(false);
//                         router.push(`/`);
//                       }}
//                       className="w-full text-left px-3 py-2 text-sm rounded-lg
//                       hover:bg-gray-100 dark:hover:bg-gray-800
//                       text-gray-700 dark:text-gray-300 transition"
//                     >
//                       {/* {locale === "ar" ? `اهلا بيك : -  ` : `Welcome:- ${session?.user?.name}`} */}
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         setIsPopupVisible(false);
//                         router.push(`/dashboard`);
//                       }}
//                       className="w-full text-left px-3 py-2 text-sm rounded-lg
//                       hover:bg-gray-100 dark:hover:bg-gray-800
//                       text-gray-700 dark:text-gray-300 transition"
//                     >
//                     </button>
//                   )}

//               <button
//                 // onClick={() => signOut()}
//                 className="w-full text-center px-3 py-2 text-sm rounded-lg
//                 bg-red-500 hover:bg-red-600 text-white transition"
//               >
//                 {locale === "ar" ? "تسجيل الخروج" : "Sign Out"}
//               </button>
//             </div>
//           </motion.div>
       
//       </AnimatePresence>
   
// </div>

//   )
// }

// export default ProfileMenu