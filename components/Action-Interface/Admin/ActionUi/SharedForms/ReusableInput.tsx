"use client";

import InputForm from "@/components/common/Normal-Form/Input/InputForm";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";
import { Control, UseFormGetValues, FieldValues, Path } from "react-hook-form";

interface ReusableInputProps<T extends FieldValues> {
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  nameOne: Path<T>;
  nameTwo: Path<T>;
  labelOne?: string;
  labelTwo?: string;
  head?: string;
}

const ReusableInput = <T extends FieldValues>({
  control,
  getValues,
  nameOne,
  nameTwo,
  labelOne = "Create",
  labelTwo = "Create",
  head,
}: ReusableInputProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full">
      {/* ================= VIEW MODE ================= */}
      {!isEditing && (
        <div className="group relative border rounded-xl p-4 bg-muted/40 hover:bg-muted transition-all duration-200">
          <h1 className="">{head}</h1>

          <div className="flex justify-between items-start">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8">{labelOne}</span>
                <p className="font-medium">
                  {getValues(nameOne) || "No English Title"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8">{labelTwo}</span>
                <p className="font-medium text-right w-full" >
                  {getValues(nameTwo) || "لا يوجد عنوان"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {isEditing && (
        <div className="border rounded-xl p-4 space-y-4 bg-background shadow-sm animate-in fade-in-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <InputForm<T>
            control={control}
            name={nameOne}
            label={labelOne}
            placeholder="Enter English title"
          />

          <InputForm<T>
            control={control}
            name={nameTwo}
            label={labelTwo}
            dir="rtl"
            placeholder="ادخل العنوان بالعربية"
          />
          </div>
          

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>

            <Button onClick={() => setIsEditing(false)}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableInput;
