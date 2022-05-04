import WaveSurferPlayer from "./components/WaveSurfer/WaveSurfer";
import NavBar from "./components/Navbar/Navbar";
import { useState } from "react";

function App() {
 const [audioFile, setAudioFile] = useState<File | null>(null);

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
   <section></section>
  </div>
 );
}

export default App;
