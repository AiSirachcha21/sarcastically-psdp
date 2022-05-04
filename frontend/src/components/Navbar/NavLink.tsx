import React from "react";

interface NavLinkProps {
 href: string;
 className?: string;
 children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, className, children }) => {
 return (
  <a href={href} className={className}>
   {children}
  </a>
 );
};

export default NavLink;
