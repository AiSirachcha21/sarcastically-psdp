import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 hasShadow?: boolean;
}

const Button: React.FC<Props> = ({
 children,
 hasShadow = false,
 className,
 ...props
}) => {
 return (
  <button
   {...props}
   className={clsx(
    "flex justify-center items-center",
    "bg-white text-slate-900",
    "px-4 py-2 rounded-xl ",
    hasShadow && "shadow-2xl shadow-black",
    className
   )}
  >
   {children}
  </button>
 );
};

export default Button;
