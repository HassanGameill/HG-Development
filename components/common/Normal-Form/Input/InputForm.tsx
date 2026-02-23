import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

type InputFormProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const InputForm = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  onBlur,
}: InputFormProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
               onChange={(e) => {
                const value = e.target.value;

                // ✅ Convert number inputs automatically
                if (type === "number") {
                  field.onChange(value === "" ? undefined : Number(value));
                } else {
                  field.onChange(value);
                }
              }}
              onBlur={(e) => {
                field.onBlur(); // RHF blur
                onBlur?.(e); // custom blur
              }}
              className="dark:bg-slate-700"
            />
          </FormControl>

          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
