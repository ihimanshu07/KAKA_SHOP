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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
          <SelectItem value="USER">USER</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
