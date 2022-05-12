import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { BsFillPlayFill, BsFillStopFill, BsUpload } from "react-icons/bs";
import WaveSurfer from "wavesurfer.js";
import { Inputs } from "../../common/constants/types";
import Button from "../Button/Button";

interface Props {
 onFileChange?: (file: File) => void;
 register: UseFormRegister<Inputs>;
}

const WaveSurferPlayer = ({ onFileChange, register }: Props) => {
 const waveSurfer = useRef<null | WaveSurfer>(null);
 const fileInput = useRef<null | HTMLInputElement>(null);

 const [isWaveSurferPlaying, setIsWaveSurferPlaying] = useState(false);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);

 // rhf: React Hook Form
 const {
  ref: rhfAudioFileInputRefCallback,
  onChange: rhfOnAudioFileChange,
  ...audioFileRegisterInputProps
 } = register("audio_file", {
  required: { value: true, message: "Please select an audio file" }
 });

 useEffect(() => {
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
   waveSurfer.current.load(`${process.env.PUBLIC_URL}/audio/default.wav`);
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
  rhfOnAudioFileChange(event as React.ChangeEvent<HTMLInputElement>);
  const [fileUploaded]: File[] = event.target.files;
  if (onFileChange && fileUploaded) {
   setSelectedFile(fileUploaded);
   if (selectedFile) {
    waveSurfer.current?.loadBlob(selectedFile);
   }
   onFileChange(fileUploaded);
  }
 }

 return (
  <div id="wavesurfer" className="bg-teal-900 relative rounded-xl h-80">
   {selectedFile && (
    <Button
     type="button"
     onMouseDown={handleWavesurferPlayStateChange}
     className="absolute left-1/2 top-1/2 translate-x-1/4 -translate-y-1/2 hover:cursor-pointer z-10"
     hasShadow
    >
     {isWaveSurferPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
     {isWaveSurferPlaying ? "Pause" : "Play"}
    </Button>
   )}
   <input
    ref={(e) => {
     rhfAudioFileInputRefCallback(e);
     fileInput.current = e;
    }}
    type="file"
    className="hidden"
    accept=".wav,.mp3,.mp4"
    onChange={handleAudioFileChange}
    {...audioFileRegisterInputProps}
   />
   <Button
    onMouseDown={() => fileInput.current?.click()}
    type="button"
    className={clsx(
     "absolute top-1/2",
     "-translate-y-1/2",
     selectedFile ? "right-1/2 -translate-x-1/4" : "left-1/2 -translate-x-1/2",
     "hover:cursor-pointer",
     "z-10",
     "max-w-prose overflow-ellipsis"
    )}
    hasShadow
   >
    <BsUpload />
    {selectedFile ? selectedFile.name : "Upload"}
   </Button>
  </div>
 );
};

export default WaveSurferPlayer;
