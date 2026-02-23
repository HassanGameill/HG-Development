import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { activateAccountService } from "./ActivateAccountServices";

export const useOTPActivation = (
  isEn: boolean,
  onSuccess: () => void
) => {
  return useMutation({
    mutationFn: activateAccountService,
    retry: false,
    onSuccess: () => {
      toast.success(
        isEn
          ? "Account activated successfully"
          : "تم تفعيل الحساب بنجاح"
      );
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Activation failed"
      );
    },
  });
};
