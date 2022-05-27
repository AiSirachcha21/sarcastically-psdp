import clsx from "clsx";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import NavLink from "./NavLink";

interface Props {
 onMenuOpen?: (state: boolean) => void;
}

const MobileNavbar = ({ onMenuOpen }: Props) => {
 const [menuIsOpen, setMenuIsOpen] = useState(false);

 const handleMenuOpen = (newState: boolean) => {
  setMenuIsOpen(newState);
  onMenuOpen && onMenuOpen(newState);
 };

 return (
  <header
   className={clsx(
    "grid grid-cols-12",
    menuIsOpen ? "px-0" : "p-4",
    "mb-4",
    "relative"
   )}
  >
   {!menuIsOpen && (
    <>
     <NavLink
      href="/"
      className="col-span-10 place-items-center font-pacifico text-3xl font-normal"
     >
      Sarcastically
     </NavLink>
     <AiOutlineMenu
      className="col-span-2 justify-self-end self-center text-2xl"
      onClick={() => handleMenuOpen(true)}
     />
    </>
   )}

   {menuIsOpen && (
    <nav
     className={clsx(
      "flex flex-col gap-4",
      "bg-white",
      "fixed top-0 z-20",
      "w-screen h-screen",
      "p-4",
      "transition-all ease-in-out duration-300",
      menuIsOpen && "w-screen"
     )}
    >
     <div className="flex items-center justify-between mb-4">
      <NavLink
       href="/"
       className="col-span-10 place-items-center font-pacifico text-3xl font-normal"
      >
       Sarcastically
      </NavLink>
      <AiOutlineClose
       className="text-2xl"
       onClick={() => handleMenuOpen(false)}
      />
     </div>
     <NavLink href="/" variant="mobile-navlink">
      Check Sarcasm
     </NavLink>
     <NavLink href="/about" variant="mobile-navlink">
      About Sarcastically
     </NavLink>
    </nav>
   )}
  </header>
 );
};

export default MobileNavbar;
