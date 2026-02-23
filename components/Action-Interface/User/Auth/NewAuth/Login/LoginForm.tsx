"use client";

import Input from "@/components/common/Normal-Form/Input/Input";
import { useLocale } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Heading from "@/components/common/Headings/Heading";
import { TAuthRoute } from "@/types/authTypes";
import { SignInSchema } from "@/validation/auth/SignInSchema";
import { useLogin } from "./useLogin";

type TFormInput = {
  email: string;
  password: string;
};

type Props = {
  setRoute: (route: TAuthRoute) => void;
    setOpen: (open: boolean) => void;

};

export type Lang = "en" | "ar";

const LoginForm = ({ setOpen}: Props) => {
  const locale = useLocale() as Lang;
  const isEn = locale === "en";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormInput>({
    mode: "onBlur",
    resolver: zodResolver(SignInSchema(locale)),
  });

  const { mutateAsync, isPending } = useLogin(isEn);

  const submitForm: SubmitHandler<TFormInput> = async (data) => {
    try {
      await mutateAsync(data);
      setOpen(false)
    } catch {
      // errors handled in hook
    }
  };

  const content = {
    title: isEn ? "Login" : "تسجيل الدخول",
    desc: isEn
      ? "Welcome back! Please login to your account"
      : "مرحبًا بعودتك! الرجاء تسجيل الدخول",
    email: isEn ? "Email" : "البريد الإلكتروني",
    password: isEn ? "Password" : "كلمة المرور",
    submit: isEn ? "Login" : "تسجيل الدخول",
    forgot: isEn ? "Forgot password?" : "نسيت كلمة المرور؟",
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center my-5">
        <Heading title={content.title} description={content.desc} />
      </div>

      <form
        className="flex flex-col items-center gap-3 w-full"
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

        
        <Button
          type="submit"
          disabled={isPending}
          className=" mt-4 dark:text-slate-800"
        >
          {isPending
            ? isEn
              ? "Logging in..."
              : "جاري تسجيل الدخول..."
            : content.submit}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
