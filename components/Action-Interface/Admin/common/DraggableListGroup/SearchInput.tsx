"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchInput = ({ value, onChange }: Props) => (
  <div className="relative w-full max-w-md">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search QR code by name..."
      className="pl-9 pr-10"
    />
    {value && (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("")}
        className="absolute right-1 top-1/2 -translate-y-1/2"
      >
        <X className="w-4 h-4" />
      </Button>
    )}
  </div>
);

export default SearchInput;
