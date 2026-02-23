import { z } from "zod";

// validationMessages.ts
export const verificationMessages = {
  en: {
    codeRequired: "Verification code is required",
    codeInvalid: "Verification code must be 6 digits",
  },
  ar: {
    codeRequired: "رمز التحقق مطلوب",
    codeInvalid: "رمز التحقق يجب أن يتكون من 6 أرقام",
  },
} as const;

const VerificationSchema = (lang: "en" | "ar") => {
  const m = verificationMessages[lang];

  return z.object({
    verificationCode: z
      .string()
      .min(1, { message: m.codeRequired }) // required
      .regex(/^\d{4}$/, { message: m.codeInvalid }), // must be exactly 6 digits
  });
};

type TVerification = z.infer<ReturnType<typeof VerificationSchema>>;

export { VerificationSchema, type TVerification };
