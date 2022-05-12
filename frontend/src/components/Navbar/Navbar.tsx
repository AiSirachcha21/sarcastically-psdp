import clsx from "clsx";
import NavLink from "./NavLink";

const NavBar = () => {
 return (
  <nav className={clsx("hidden md:flex", "justify-between", "py-8")}>
   <NavLink href="#">Check Sarcasm</NavLink>
   <NavLink href="/" className="font-pacifico text-4xl font-normal">
    Sarcastically
   </NavLink>
   <NavLink href="#">About Sarcastically</NavLink>
  </nav>
 );
};

export default NavBar;
