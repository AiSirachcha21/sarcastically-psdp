import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsFillStopFill, BsUpload } from "react-icons/bs";
import WaveSurfer from "wavesurfer.js";
import Button from "../Button/Button";

interface Props {
 onFileChange?: (file: File) => void;
}

const WaveSurferPlayer = ({ onFileChange }: Props) => {
 const waveSurfer = useRef<null | WaveSurfer>(null);
 const fileInput = useRef<null | HTMLInputElement>(null);

 const [isWaveSurferPlaying, setIsWaveSurferPlaying] = useState(false);
 const [waveSurferReady, setWaveSurferReady] = useState(false);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);

 useEffect(() => {
  function handleReady() {
   setWaveSurferReady(true);
  }

  function handleOnFinish() {
   setIsWaveSurferPlaying(false);
   waveSurfer.current && waveSurfer.current.seekTo(0);
  }

  if (!waveSurfer.current) {
   waveSurfer.current = WaveSurfer.create({
    container: "#wavesurfer",
    waveColor: "#0f766d",
    progressColor: "#14b8a5",
    backend: "MediaElement",
    loopSelection: false,
    scrollParent: true,
    interact: false,
    responsive: true,
    height: 320
   });
  }

  if (waveSurfer.current) {
   waveSurfer.current.load(`${process.env.PUBLIC_URL}/1_60.wav`);
   waveSurfer.current.on("ready", handleReady);
   waveSurfer.current.on("finish", handleOnFinish);
   waveSurfer.current.util.preventClick();
   waveSurfer.current.setVolume(1);
  }

  return () => {
   waveSurfer.current && waveSurfer.current.unAll();
  };
 }, []);

 function handleWavesurferPlayStateChange() {
  if (waveSurfer.current) {
   waveSurfer.current.playPause();
   setIsWaveSurferPlaying(waveSurfer.current.isPlaying());
  }
 }

 async function handleAudioFileChange(event: any) {
  const [fileUploaded]: File[] = event.target.files;
  if (onFileChange) {
   setSelectedFile(fileUploaded);
   onFileChange(fileUploaded);
  }
 }

 return (
  <div id="wavesurfer" className="bg-teal-900 relative rounded-xl h-80">
   <Button
    onMouseDown={handleWavesurferPlayStateChange}
    className="absolute left-1/2 top-1/2 translate-x-1/4 -translate-y-1/2 hover:cursor-pointer z-10 gap-2"
    hasShadow
   >
    {isWaveSurferPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
    {isWaveSurferPlaying ? "Pause" : "Play"}
   </Button>
   <input
    ref={fileInput}
    type="file"
    className="hidden"
    onChange={handleAudioFileChange}
    accept=".wav,.mp3,.mp4"
   />
   <Button
    onMouseDown={() => fileInput.current?.click()}
    className="absolute right-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 hover:cursor-pointer z-10 gap-2 max-w-prose overflow-ellipsis"
    hasShadow
   >
    <BsUpload />
    {selectedFile ? selectedFile.name : "Upload"}
   </Button>
  </div>
 );
};

export default WaveSurferPlayer;
