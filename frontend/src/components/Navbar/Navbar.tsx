import clsx from "clsx";
import React from "react";
import NavLink from "./NavLink";

const NavBar = () => {
 return (
  <nav className={clsx("flex justify-between", "py-8")}>
   <NavLink href="#">Check Sarcasm</NavLink>
   <NavLink href="/" className="font-pacifico text-4xl font-normal">
    Sarcastically
   </NavLink>
   <NavLink href="#">About Sarcastically</NavLink>
  </nav>
 );
};

export default NavBar;
