// 'use client'
// import {
//   Dialog,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Dispatch, SetStateAction } from "react";
// import type { AuthRoute } from "@/types/auth";

// type ModalComponentProps = {
//   setOpen: (open: boolean) => void;
//   setRoute?: Dispatch<SetStateAction<AuthRoute>>;
// };

// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   onClose?: () => void;
//   component: React.ComponentType<ModalComponentProps>;
//   setRoute?: Dispatch<SetStateAction<AuthRoute>>;
// };

// const CustomModal = ({
//   open,
//   onClose,
//   setOpen,
//   setRoute,
//   component: Component,
// }: Props) => {
//   const onChange = (open: boolean) => {
//     setOpen(open);
//     if (!open) {
//       onClose?.();
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onChange}>
//       <DialogContent className="w-[450px] p-0 bg-white dark:bg-slate-900 rounded-lg">
//         <Component setOpen={setOpen} setRoute={setRoute} />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CustomModal;
