import clsx from "clsx";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { ScreenSizes } from "../common/constants/mediaQuery";
import Button from "../components/Button/Button";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import NavBar from "../components/Navbar/Navbar";

type Props = {};

const AboutUs = (props: Props) => {
 const [preventScroll, setPreventScroll] = useState(false);

 const isMobile = useMediaQuery({ maxWidth: ScreenSizes.mobile.max });

 useEffect(() => {
  document.title = "About | Sarcastically";
 }, []);

 return (
  <div
   className={clsx(
    "min-h-screen max-w-screen-xl mx-auto",
    preventScroll ? "overflow-hidden max-h-0" : "overflow-y-scroll"
   )}
  >
   {isMobile ? <MobileNavbar onMenuOpen={setPreventScroll} /> : <NavBar />}
   <article className="pb-4 px-4">
    <h1>What are we trying to fix ?</h1>
    <p className="mb-4">
     <b>Sarcasm</b> is one of the most well-known but easily misunderstood parts
     of the English language. It is a highly sophisticated structure of language
     where the intent of the statement is inverted to pass on another intended
     message in a roundabout way.
     <br />
     <br />
     While many people do understand it, the uniqueness about is is that{" "}
     <b>
      <em>no one really thinks about it the same way</em>
     </b>
     .
     <br />
     <br />
     Something that you may think is <em>"easily"</em> sarcastic might not be
     the same as another person's interpretation.
    </p>
    <h2>So what are we trying to do ?</h2>
    <p className="mb-4">
     We are trying to fix the problem of sarcasm by providing a platform where
     you can check if your statement is sarcastic or not.
    </p>
    <h2>But why Sarcastically ?</h2>
    <p className="mb-4">
     A very rare but highly sought-after area of sarcasm research is Audio,
     where the text is generally accompanied by a sibling audio to generate
     context instead of other parts of speech. Sound plays just as much a part
     as other social and visual cues which indicate sarcasm.
     <br />
     <br />
     Sarcastically's job is to try and make this a reality by utilizing audio
     clips alongside text to predict if the statement is sarcastic or not.
    </p>
   </article>
   <div className="flex flex-col items-center justify-center m-4 gap-2 rounded-xl py-4 px-2 bg-slate-200">
    <h2 className="text-center">Wanna try yourself ?</h2>
    <Button variant="primary">
     <>
      <p className="text-white">Go to Sarcastically</p>
      <BsArrowRight className="fill-white" />
     </>
    </Button>
   </div>
  </div>
 );
};

export default AboutUs;
