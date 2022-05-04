import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import WaveSurfer from "wavesurfer.js";
import Button from "../Button/Button";

interface Props {}

const WaveSurferPlayer = ({}: Props) => {
 const waveSurfer = useRef<null | WaveSurfer>(null);
 const [isWaveSurferPlaying, setIsWaveSurferPlaying] = useState(false);
 const [waveSurferReady, setWaveSurferReady] = useState(false);

 useEffect(() => {
  function handleReady() {
   waveSurfer.current?.fireEvent("ready");
   setWaveSurferReady(true);
  }

  if (!waveSurfer.current) {
   waveSurfer.current = WaveSurfer.create({
    container: "#wavesurfer",
    waveColor: "#f0f0f0",
    progressColor: "#394b5b",
    backend: "MediaElement",
    loopSelection: false,
    scrollParent: true,
    interact: false,
    responsive: true,
    height: 320
   });

   waveSurfer.current.load(`${process.env.PUBLIC_URL}/1_60.wav`);
   waveSurfer.current.on("ready", handleReady);
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

 return (
  <div id="wavesurfer" className="bg-slate-900 relative rounded-xl h-80">
   <Button
    onMouseDown={handleWavesurferPlayStateChange}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer z-10 gap-2"
    hasShadow
   >
    {isWaveSurferPlaying ? <BsFillStopFill /> : <BsFillPlayFill />}
    {isWaveSurferPlaying ? "Pause" : "Play"}
   </Button>
  </div>
 );
};

export default WaveSurferPlayer;
