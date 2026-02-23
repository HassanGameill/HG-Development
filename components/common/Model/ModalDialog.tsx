"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const ModalDialog = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  footer,
}: ModalProps) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
          w-[95%] sm:max-w-lg
          rounded-xl bg-white shadow-lg
          p-6
          transition-all
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95
        "
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-semibold">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
