import WaveSurferPlayer from "./components/WaveSurfer/WaveSurfer";
import NavBar from "./components/Navbar/Navbar";
import { useCallback, useEffect, useState } from "react";
import Button from "./components/Button/Button";
import { SarcasmState } from "./common/constants/enums";

function App() {
 const [audioFile, setAudioFile] = useState<File | null>(null);
 const [sarcasmState, setSarcasmState] = useState<SarcasmState>(
  SarcasmState.NOT_SET
 );
 const [sarcasmStateString, setSarcasmStateString] =
  useState("Cannot Calculate");

 const getSarcasmStateString = useCallback(
  (sarcasmState: SarcasmState) => {
   switch (sarcasmState) {
    case SarcasmState.SARCSTIC:
     setSarcasmStateString("Sarcastic");
     break;

    case SarcasmState.NON_SARCSTIC:
     setSarcasmStateString("Not Sarcastic");
     break;

    case SarcasmState.NOT_SET:
    default:
     setSarcasmStateString("Cannot Calculate");
   }
  },
  [sarcasmState]
 );

 useEffect(() => {
  getSarcasmStateString(sarcasmState);
 }, [sarcasmState]);

 return (
  <div className="min-h-screen w-11/12 mx-auto">
   <NavBar />
   <section>
    <div className="flex flex-col gap-2 mb-4">
     <h2>Check Sarcasm</h2>
     <h3>1. Record yourself saying something sarcastic</h3>
    </div>
    <WaveSurferPlayer onFileChange={(file) => setAudioFile(file)} />
   </section>
   <section className="grid grid-cols-12 my-8 gap-24">
    <div className="col-span-6 flex flex-col gap-8">
     <div className="flex flex-col gap-2">
      <h3>2. Type what you said</h3>
      <input
       type="text"
       placeholder="Type the text in the audio"
       className="rounded-xl py-3 px-4 placeholder-teal-500 placeholder:text-sm placeholder:font-normal focus:outline-teal-700 border border-teal-500"
      />
     </div>
     <div className="flex flex-col gap-2">
      <h3>3. Submit to predict whether what you said was sarcastic or not</h3>
      <Button className="bg-teal-700 text-white w-fit">Submit</Button>
     </div>
    </div>
    <div className="col-span-6 flex flex-col">
     <h3 className="text-base font-semibold">Result :</h3>
     <p className="text-4xl font-bold">{sarcasmStateString}</p>
    </div>
   </section>
  </div>
 );
}

export default App;
