import WaveSurferPlayer from "./components/WaveSurfer/WaveSurfer";
import NavBar from "./components/Navbar/Navbar";

function App() {
 return (
  <div className="min-h-screen w-11/12 mx-auto">
   <NavBar />
   <section>
    <div className="flex flex-col gap-2 mb-4">
     <h2>Check Sarcasm</h2>
     <h3>1. Record yourself saying something sarcastic</h3>
    </div>
    <WaveSurferPlayer />
   </section>
   <section></section>
  </div>
 );
}

export default App;
