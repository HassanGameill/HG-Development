import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useLocale } from "next-intl";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type TInputProps<TFieldValue extends FieldValues> = {
  name: Path<TFieldValue>;
  label?: string;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  type = "text",
  name,
  error,
  register,
  onBlur,
  formText,
  success,
  disabled,
}: TInputProps<TFieldValue>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const locale = useLocale();
  const isEn = locale === "en";

  const { onBlur: rhfOnBlur, ...rest } = register(name);
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    rhfOnBlur(e);
    onBlur?.(e);
  };

  return (
    <div className="w-full flex flex-col md:w-[65%]">
      {label && <label className={`text-[10px] px-5 my-1.5 `}>{label}</label>}

      <div className="relative">
        <input
          {...rest}
          type={isPassword && showPassword ? "text" : type}
          placeholder={label}
          disabled={disabled}
          aria-invalid={!!error}
          onBlur={onblurHandler}
          className={`
            text-[16px]
            rounded-[1rem]
            bg-white dark:bg-slate-900
            outline-none
            placeholder:text-[12px]
            py-2 w-full px-4 shadow-md
            ${
              error
                ? "border border-red-600"
                : success
                ? "border-2 border-green-600"
                : ""
            }
          `}
        />

        {/* 👁️ Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <label className="text-red-600 text-[12px] px-4">{error}</label>
      )}

      {success && (
        <label className="text-green-600 text-[12px] px-4">{success}</label>
      )}

      {formText && (
        <span className="text-blue-500 text-[12px] px-4">{formText}</span>
      )}
    </div>
  );
};

export default Input;
