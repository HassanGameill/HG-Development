import { z } from "zod";


// validationMessages.ts
export const signUpMessages = {
  en: {
    
    emailRequired: "Email address is required",
    emailInvalid: "Invalid email address",
    passwordMin: "Password must be at least 8 characters long",
    passwordSpecial: "Password should contain at least 1 special character",
    
  },
  ar: {
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",
    passwordMin: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    passwordSpecial: "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل",
    
  },
} as const;


 const SignInSchema = (lang: "en" | "ar") => {
  const m = signUpMessages[lang];

  return z
    .object({
      email: z
        .string()
        .min(1, { message: m.emailRequired })
        .email({ message: m.emailInvalid }),
      password: z
        .string()
        .min(8, { message: m.passwordMin }),
      
    });
};

type TSignIn = z.infer<ReturnType<typeof SignInSchema>>;

export {SignInSchema, type  TSignIn}