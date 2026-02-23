import Input from "@/components/common/Normal-Form/Input/Input";
import { useLocale } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validation/auth/SignUpSchema";
import { Button } from "@/components/ui/button";
import Heading from "@/components/common/Headings/Heading";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { TAuthRoute } from "@/types/authTypes";

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
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TFormInput>({
    mode: "onBlur",
    resolver: zodResolver(SignUpSchema(locale)),
  });

  // ___ Redux Auth ___
  const [registerUser, { isLoading }] = useRegisterMutation();

  // ___ Language Content ___
  const content = {
    title: isEn ? "Sign Up" : "إنشاء حساب",
    desc: isEn
      ? "You must create an account to enable all features"
      : "يجب إنشاء حساب لتتمكن من جميع المميزات",
    name: isEn ? "First Name" : "الاسم الأول",
    email: isEn ? "Email" : "البريد الإلكتروني",
    password: isEn ? "Password" : "كلمة المرور",
    phone: isEn ? "phone" : "Add Phone",
    submit: isEn ? "Sign Up" : "إنشاء حساب",
  };

  // ___ Submit ___
  const submitForm: SubmitHandler<TFormInput> = async (formData) => {
    try {
      const res = await registerUser(formData).unwrap();

      toast.success( isEn ? "Registration successful" : "تم التسجيل بنجاح"
);
      setRoute("verification"); // ✅ only on success
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
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

        <div className="flex items-center justify-center mt-4 ">
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full dark:text-slate-800"
          >
            {isLoading ? "Creating account..." : content.submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
