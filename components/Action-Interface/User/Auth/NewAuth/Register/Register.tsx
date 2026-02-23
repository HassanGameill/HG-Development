"use client";

import Input from "@/components/common/Normal-Form/Input/Input";
import { useLocale } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validation/auth/SignUpSchema";
import { Button } from "@/components/ui/button";
import Heading from "@/components/common/Headings/Heading";
import { TAuthRoute } from "@/types/authTypes";
import { useRegister } from "./useRegister";

type TRouteProps = {
  setRoute: (route: TAuthRoute) => void;
};

type TFormInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type Lang = "en" | "ar";

const RegisterForm = ({ setRoute }: TRouteProps) => {
  const locale = useLocale() as Lang;
  const isEn = locale === "en";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormInput>({
    mode: "onBlur",
    resolver: zodResolver(SignUpSchema(locale)),
  });

  const { mutateAsync, isPending } = useRegister(isEn);

  const submitForm: SubmitHandler<TFormInput> = async (data) => {
    try {
      await mutateAsync(data);
      setRoute("verification");
    } catch {
      // handled in hook
    }
  };

  const content = {
    title: isEn ? "Sign Up" : "إنشاء حساب",
    desc: isEn
      ? "You must create an account to enable all features"
      : "يجب إنشاء حساب لتتمكن من جميع المميزات",
    name: isEn ? "First Name" : "الاسم الأول",
    email: isEn ? "Email" : "البريد الإلكتروني",
    phone: isEn ? "Phone" : "يحب كتابه رقم الهاتف",
    password: isEn ? "Password" : "كلمة المرور",
    submit: isEn ? "Sign Up" : "إنشاء حساب",
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
          label={content.name}
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
        />

        <div className="w-full md:w-[65%] flex items-center gap-4">
          <Input
          label={content.email}
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label={content.phone}
          name="phone"
          type="phone"
          register={register}
          error={errors.email?.message}
        />
        </div>

        

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
              ? "Creating account..."
              : "جاري إنشاء الحساب..."
            : content.submit}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
