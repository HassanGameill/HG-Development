import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser } from "./LoginServices";

export const useLogin = (isEn: boolean) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success(
        isEn ? "Login successful" : "تم تسجيل الدخول بنجاح"
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          (isEn ? "Invalid credentials" : "بيانات الدخول غير صحيحة")
      );
    },
  });
};
