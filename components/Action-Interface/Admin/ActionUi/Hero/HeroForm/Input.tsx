import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";


// Reusable bilingual input
export const FormInput = ({
  control,
  nameEn,
  nameAr,
  label,
  placeholderEn,
  placeholderAr,
  disabled,
  maxLength,
  textarea = false,
}: {
  control: any;
  nameEn: string;
  nameAr: string;
  label: string;
  placeholderEn?: string;
  placeholderAr?: string;
  disabled?: boolean;
  maxLength?: number;
  textarea?: boolean;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={control}
      name={nameEn}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} (English)</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea {...field} disabled={disabled} rows={3} placeholder={placeholderEn} maxLength={maxLength} />
            ) : (
              <Input {...field} disabled={disabled} placeholder={placeholderEn} maxLength={maxLength} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name={nameAr}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} (Arabic)</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea {...field} dir="rtl" className="text-right" disabled={disabled} rows={3} placeholder={placeholderAr} maxLength={maxLength} />
            ) : (
              <Input {...field} dir="rtl" className="text-right" disabled={disabled} placeholder={placeholderAr} maxLength={maxLength} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
