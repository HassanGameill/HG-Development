import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "./RegisterServies"; 

export const useRegister = (isEn: boolean) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(
        isEn ? "Registration successful" : "تم التسجيل بنجاح"
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          (isEn ? "Something went wrong" : "حدث خطأ ما")
      );
    },
  });
};
