"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function FORM({ value, onValueChange }: FormProps) {
  const [role, setRole] = React.useState<string>(value || "")
  
  const handleValueChange = (newValue: string) => {
    setRole(newValue);
    onValueChange?.(newValue);
  }
  
  React.useEffect(() => {
    if (value !== undefined && value !== role) {
      setRole(value);
    }
  }, [value])
  
  return (
    <Select value={role} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full h-11 transition-all duration-300 hover:border-primary/50 focus:ring-2 focus:ring-primary/20">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent className="animate-scale-in">
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="ADMIN" className="cursor-pointer hover:bg-accent transition-colors">
            ADMIN
          </SelectItem>
          <SelectItem value="USER" className="cursor-pointer hover:bg-accent transition-colors">
            USER
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
