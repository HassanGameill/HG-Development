"use client";

import { useState, useRef, useEffect } from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineSafety } from "react-icons/ai";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import { TAuthRoute } from "@/types/authTypes";
import { useOTPActivation } from "./useOTPActivation";

type Props = {
  setRoute: (route: TAuthRoute) => void;
};

const OTPVerification = ({ setRoute }: Props) => {
  const locale = useLocale();
  const isEn = locale === "en";
   const OTP_LENGTH = 4;

  const { token } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [invalidError, setInvalidError] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const { mutate, isPending } = useOTPActivation(isEn, () =>
    setRoute("login")
  );

  /* ---------------- Handlers ---------------- */

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

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index !== 0) return;

    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < OTP_LENGTH) newOtp.push("");

    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();
    e.preventDefault();
  };

  const verifyOtp = () => {
    if (isPending) return;

    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setInvalidError(true);
      return;
    }

    mutate({
      activation_token: token,
      activation_code: code,
    });
  };

  /* Auto-submit */
  // useEffect(() => {
  //   if (otp.every(Boolean) && !isPending) {
  //     verifyOtp();
  //   }
  // }, [otp]);

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full" dir={isEn ? "ltr" : "rtl"}>
      <CardHeader className="text-center">
        <CardTitle>
          {isEn ? "Enter OTP" : "أدخل رمز التحقق"}
        </CardTitle>
        <CardDescription>
          {isEn
            ? "Enter the 4-digit code sent to your email"
            : "أدخل رمز التحقق المكون من 4 أرقام"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-blue-500 p-3">
          <AiOutlineSafety className="text-2xl text-white" />
        </div>

        <div className="flex gap-2" dir="ltr">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e, index)}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-12 text-center text-lg font-semibold"
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
          disabled={isPending}
          onClick={verifyOtp}
        >
          {isPending
            ? isEn
              ? "Verifying..."
              : "جاري التحقق..."
            : isEn
            ? "Verify OTP"
            : "تأكيد الرمز"}
        </Button>
      </CardContent>
    </div>
  );
};

export default OTPVerification;
