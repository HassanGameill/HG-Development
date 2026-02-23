import Input from "@/components/common/Normal-Form/Input/Input";
import { useLocale } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Heading from "@/components/common/Headings/Heading";
import { SignInSchema } from "@/validation/auth/SignInSchema";
import { TAuthRoute } from "@/types/authTypes";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect, useMemo, useRef } from "react";

type TRoute = {
  setRoute?: (route: TAuthRoute) => void;
  setOpen: (open: boolean) => void;
};

type TFormInput = {
  email: string;
  password: string;
};

type Lang = "en" | "ar";

const LoginForm = ({ setOpen }: TRoute) => {
  const locale = useLocale() as Lang;
  const isEn = locale === "en";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TFormInput>({
    mode: "onBlur",
    resolver: zodResolver(SignInSchema(locale)),
  });

  const [login, { isSuccess, isError, isLoading, error, data }] =
    useLoginMutation();

  // ✅ Prevent double toast in React 18 StrictMode
  const toastShownRef = useRef(false);

  const content = useMemo(
    () => ({
      title: isEn ? "Sign In" : "تسجيل الدخول",
      desc: isEn
        ? "You must login to continue"
        : "يجب تسجيل الدخول للمتابعة",
      email: isEn ? "Email" : "البريد الإلكتروني",
      password: isEn ? "Password" : "كلمة المرور",
      submit: isEn ? "Sign In" : "تسجيل الدخول",
      loading: isEn ? "Signing in..." : "جاري تسجيل الدخول...",
      success: isEn
        ? "Login successfully"
        : "تم تسجيل الدخول بنجاح",
      error: isEn
        ? "Invalid email or password"
        : "بيانات الدخول غير صحيحة",
    }),
    [isEn]
  );

  // ___ Submit ___
  const submitForm: SubmitHandler<TFormInput> = async (formData) => {
    toastShownRef.current = false; // reset before each submit
    try {
      await login(formData).unwrap();
    } catch {
      // handled in effect
    }
  };

  // ___ Side Effects ___
  useEffect(() => {
    if (toastShownRef.current) return;

    if (isSuccess) {
      toast.success(data?.message ?? content.success);
      setOpen(false);
      toastShownRef.current = true;
    }

    if (isError) {
      const apiError =
        (error as { data?: { message?: string } })?.data?.message ??
        content.error;

      toast.error(apiError);
      toastShownRef.current = true;
    }
  }, [isSuccess, isError, error, data, setOpen, content]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center my-5">
        <Heading title={content.title} description={content.desc} />
      </div>

      <form
        className="flex flex-col items-center justify-center gap-3 w-full"
        onSubmit={handleSubmit(submitForm)}
      >
        <Input
          label={content.email}
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label={content.password}
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-center mt-4">
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full dark:text-slate-800 "
          >
            {isLoading ? content.loading : content.submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
