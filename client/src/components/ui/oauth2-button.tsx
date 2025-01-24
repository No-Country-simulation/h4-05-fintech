import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type OAuth2Type = 'Google' | 'Apple';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  label: OAuth2Type;
}

const OAuth2Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, label, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    let src: React.ImgHTMLAttributes<HTMLImageElement>['src'];
    let alt: React.ImgHTMLAttributes<HTMLImageElement>['alt'];

    switch (label) {
      case 'Google':
        src = "https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977147/fintech/mass56ztwpkywyfnbhx9.svg";
        break;
      case 'Apple':
        src = "https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977163/fintech/qv7hg5otdckrcprbxtrf.svg";
        break
      default:
        break
    }

    switch (label) {
      case 'Google':
        alt = "Login with Google"
        break;
      case 'Apple':
        alt = "Login with Apple"
        break
      default:
        break
    }

    return (
      <Comp 
        className={className}
        ref={ref}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          width={25}
          height={26}
        />
      </Comp>
    )
  }
)
OAuth2Button.displayName = "Button"

export { OAuth2Button }