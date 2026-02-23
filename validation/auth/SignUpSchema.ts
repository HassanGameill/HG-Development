import { z } from "zod";

// validationMessages.ts
export const signUpMessages = {
  en: {
    firstNameRequired: "name is required",
    emailRequired: "Email address is required",
    emailInvalid: "Invalid email address",

    phoneMin: "Please write your phone number",
    phoneSpecial: "Password should contain at least 1 special character",

    passwordMin: "Password must be at least 8 characters long",
    passwordSpecial: "Password should contain at least 1 special character",
    confirmPasswordRequired: "Confirm Password is required",
    passwordMismatch: "Password and Confirm Password do not match",
  },
  ar: {
    firstNameRequired: "الاسم مطلوب",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",

    phoneMin: "يجب كتابه رقم الموبيل",
    phoneSpecial: "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل",

    passwordMin: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    passwordSpecial: "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل",

    confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
    passwordMismatch: "كلمتا المرور غير متطابقتين",
  },
} as const;

const SignUpSchema = (lang: "en" | "ar") => {
  const m = signUpMessages[lang];

  return z.object({
    name: z.string().min(1, { message: m.firstNameRequired }),

    email: z
      .string()
      .min(1, { message: m.emailRequired })
      .email({ message: m.emailInvalid }),

    password: z.string().min(8, { message: m.passwordMin }),

    phone: z
      .string()
      .min(10, { message: m.phoneMin })
      .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }),
  });
};

type TSignUp = z.infer<ReturnType<typeof SignUpSchema>>;

export { SignUpSchema, type TSignUp };

// _____ Backend register Schema _________
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),

  phone: z
    .string()
    .min(10, { message: "Phone number is required" })
    .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }),
});

export type TRegister = z.infer<typeof RegisterSchema>;
