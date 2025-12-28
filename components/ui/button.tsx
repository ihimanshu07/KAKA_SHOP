import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-[3px] border-black",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF6B6B] text-white neobrutalism-shadow neobrutalism-hover neobrutalism-active",
        destructive:
          "bg-[#FF4444] text-white neobrutalism-shadow neobrutalism-hover neobrutalism-active",
        outline:
          "bg-white text-black neobrutalism-shadow neobrutalism-hover neobrutalism-active",
        secondary:
          "bg-[#FFE66D] text-black neobrutalism-shadow neobrutalism-hover neobrutalism-active",
        ghost: "bg-transparent border-0 text-black hover:bg-[#FFE66D] neobrutalism-shadow-sm",
        link: "bg-transparent border-0 text-[#FF6B6B] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

