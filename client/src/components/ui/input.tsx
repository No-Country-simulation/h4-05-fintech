import * as React from "react"
import { cn } from "@/lib/utils"
import ShowPassword from "./show-password";
import SearchItem from "./search-item";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  label?: boolean;
  isPassword?: boolean;
  isSearchItem?: boolean;
  type?: React.HTMLInputTypeAttribute
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPassword, isSearchItem, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const handlePasswordView = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    }

    const passwordInput: React.HTMLInputTypeAttribute = showPassword ? 'text': 'password';
  
    return (
      <div className="relative flex items-center">
        <input
          type={isPassword ? passwordInput : type}
          className={cn(
            "relative h-10 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && <ShowPassword showPassword={showPassword} onClick={handlePasswordView} className="absolute right-3 h-6 w-6 text-lightBlue" />}
        {isSearchItem && <SearchItem isSearchItem={isSearchItem} className="absolute right-11 h-6 w-6 text-lightBlue" />}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
