import clsx from "clsx";
import React from "react";

interface NavLinkProps {
 href: string;
 className?: string;
 children: React.ReactNode;
 variant?: "mobile-navlink" | "default";
}

const NavLink: React.FC<NavLinkProps> = ({
 href,
 className,
 variant = "default",
 children
}) => {
 return (
  <a
   href={href}
   className={clsx(variant === "mobile-navlink" && "text-2xl", className)}
  >
   {children}
  </a>
 );
};

export default NavLink;
