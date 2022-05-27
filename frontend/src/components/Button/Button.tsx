import clsx from "clsx";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 hasShadow?: boolean;
 variant?: "primary" | "default";
}

const Button: React.FC<Props> = ({
 children,
 hasShadow = false,
 variant = "default",
 className,
 ...props
}) => {
 return (
  <button
   {...props}
   className={clsx(
    "flex justify-center items-center gap-2",
    variant === "default" && "bg-white hover:bg-slate-100 text-slate-900",
    variant === "primary" && "bg-teal-600 hover:bg-teal-800 text-white",
    "px-4 py-2 rounded-xl ",
    hasShadow && "shadow-2xl shadow-black",
    "transition-colors duration-300 ease-in-out",
    className
   )}
  >
   {children}
  </button>
 );
};

export default Button;
