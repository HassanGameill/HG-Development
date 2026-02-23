"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TAuthRoute } from "@/types/authTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { AiOutlineSafety } from "react-icons/ai";
import { useLocale } from "next-intl";

type TRouteProps = {
  setRoute: (route: TAuthRoute) => void;
};

const OTP_LENGTH = 4;

const Verification = ({ setRoute }: TRouteProps) => {
  const locale = useLocale();
  const isEn = locale === "en";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [invalidError, setInvalidError] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const { token } = useSelector((state: RootState) => state.auth);
  const [activation, { isSuccess, error, isLoading }] = useActivationMutation();

  /* ------------------ EFFECTS ------------------ */
  useEffect(() => {
    if (isSuccess) {
      toast.success(
        isEn ? "Account activated successfully" : "تم تفعيل الحساب بنجاح"
      );
      setRoute("login");
    }

    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data?.message || "Activation failed");
    }
  }, [isSuccess, error, setRoute, isEn]);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setInvalidError(false);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < OTP_LENGTH) newOtp.push("");

    setOtp(newOtp);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
    e.preventDefault();
  };

  const verificationHandler = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setInvalidError(true);
      return;
    }

    await activation({
      activation_token: token,
      activation_code: code,
    });
  };

  /* Auto-submit when OTP complete */
  // useEffect(() => {
  //   if (otp.every(Boolean)) {
  //     verificationHandler();
  //   }
  // }, [otp]);

  /* ------------------ TEXT ------------------ */
  const title = isEn ? "Enter OTP" : "أدخل رمز التحقق";
  const desc = isEn
    ? "Enter the 4-digit code sent to your email"
    : "أدخل رمز التحقق المكون من 4 أرقام الذي تم ارساله الي الاميل";

  /* ------------------ RENDER ------------------ */
  return (
    <div className="w-full" dir={isEn ? "ltr" : "rtl"}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-full bg-blue-500 p-3 shadow-sm">
          <AiOutlineSafety className="text-2xl text-white" />
        </div>

        {/* OTP must stay LTR */}
        <div className="flex gap-2" dir="ltr">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-12 text-center text-lg font-semibold"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {invalidError && (
          <p className="text-sm text-red-500">
            {isEn
              ? "Please enter a valid 4-digit code"
              : "يرجى إدخال رمز مكون من 4 أرقام"}
          </p>
        )}

        <Button
          className="w-full"
          disabled={isLoading}
          onClick={verificationHandler}
        >
          {isLoading
            ? isEn
              ? "Verifying..."
              : "جاري التحقق..."
            : isEn
            ? "Verify OTP"
            : "تأكيد الرمز"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          {isEn ? "Didn’t receive the code?" : "لم يصلك الرمز؟"}{" "}
          <Button variant="link" size="sm">
            {isEn ? "Resend" : "إعادة الإرسال"}
          </Button>
        </p>
      </CardContent>
    </div>
  );
};

export default Verification;
