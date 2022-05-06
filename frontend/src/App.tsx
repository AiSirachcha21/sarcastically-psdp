import WaveSurferPlayer from "./components/WaveSurfer/WaveSurfer";
import NavBar from "./components/Navbar/Navbar";
import { useCallback, useEffect, useState } from "react";
import Button from "./components/Button/Button";
import { SarcasmState } from "./common/constants/enums";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Inputs, PredictionResponse } from "./common/constants/types";
import { SarcasmStateStrings } from "./common/constants/constants";
import clsx from "clsx";
import axios, { AxiosResponse } from "axios";
import { url } from "inspector";
import { useMutation } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
 const [sarcasmState, setSarcasmState] = useState({
  state: SarcasmState.NOT_SET,
  message: SarcasmStateStrings.NOT_SET
 });
 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
  setError
 } = useForm<Inputs>();

 const updateSarcasmState = (sarcasmState: SarcasmState) => {
  switch (sarcasmState) {
   case SarcasmState.SARCSTIC:
    setSarcasmState({
     state: SarcasmState.SARCSTIC,
     message: SarcasmStateStrings.SARCASTIC
    });
    break;
   case SarcasmState.NON_SARCSTIC:
    setSarcasmState({
     state: SarcasmState.NON_SARCSTIC,
     message: SarcasmStateStrings.NOT_SARCASTIC
    });
    break;
   case SarcasmState.NOT_SET:
    setSarcasmState({
     state: SarcasmState.NOT_SET,
     message: SarcasmStateStrings.NOT_SET
    });
    break;
   default:
    setSarcasmState({
     state: SarcasmState.CANNOT_DETECT,
     message: SarcasmStateStrings.SARCASTIC
    });
  }
 };

 const isFileValidType = (file: File): void => {
  const isAcceptedFileType = ["audio/mp3", "audio/mp4", "audio/wav"].some(
   (ft) => ft === file.type
  );

  if (!isAcceptedFileType) {
   setError("audio_file", {
    type: "value",
    message: "Please provide a file with a accepted type (mp3, mp4, wav)"
   });
  }
 };

 const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
  e?.preventDefault();
  const formdata = new FormData();
  formdata.append("audio_file", data.audio_file[0], data.audio_file[0].name);
  formdata.append("text_utterance", data.text_utterance);

  submitPredictionRequest.mutate(formdata);
 };

 const postPredictionInputs = (formData: FormData) => {
  return axios.post<any, AxiosResponse<PredictionResponse>>(
   "/sarcastically",
   formData,
   {
    headers: { "Content-Type": "multipart/form-data" }
   }
  );
 };

 const submitPredictionRequest = useMutation(postPredictionInputs, {
  onSuccess: ({ data: { result } }) => {
   const state =
    result == 0 ? SarcasmState.SARCSTIC : SarcasmState.NON_SARCSTIC;
   updateSarcasmState(state);
  }
 });

 return (
  <div className="min-h-screen w-11/12 mx-auto">
   <NavBar />
   <form onSubmit={handleSubmit(onSubmit)}>
    <section>
     <div className="flex flex-col gap-2 mb-4">
      <h2>Check Sarcasm</h2>
      <h3>
       1. Provide a recording of the sarcasm statement (.mp3, .mp4 or .wav)
      </h3>
     </div>
     <WaveSurferPlayer register={register} onFileChange={isFileValidType} />
    </section>
    <section className="grid grid-cols-12 my-8 gap-24">
     <div className="col-span-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
       <h3>2. Type what you said</h3>
       <input
        type="text"
        placeholder="Type the text in the audio"
        className="rounded-xl py-3 px-4 placeholder-teal-500 placeholder:text-sm placeholder:font-normal focus:outline-teal-700 border border-teal-500"
        {...register("text_utterance", {
         required: {
          value: true,
          message: "You need to provide the text the audio is saying"
         }
        })}
       />
       {errors.text_utterance && (
        <p className="text-red-600">{errors.text_utterance.message}</p>
       )}
      </div>
      <div className="flex flex-col gap-2">
       <h3>3. Submit to predict whether what you said was sarcastic or not</h3>
       <Button
        className="w-fit"
        variant="primary"
        type="submit"
        disabled={submitPredictionRequest.isLoading}
       >
        {submitPredictionRequest.isLoading ? "Hold On" : "Submit"}
       </Button>
      </div>
     </div>
     <div className="col-span-6 flex flex-col">
      <h3 className="text-base font-semibold">Result :</h3>
      <p
       className={clsx(
        sarcasmState.state == SarcasmState.NOT_SET ||
         submitPredictionRequest.isLoading
         ? "text-xl font-semibold"
         : "text-4xl font-bold",
        submitPredictionRequest.isLoading && "flex items-center gap-2"
       )}
      >
       {submitPredictionRequest.isLoading && (
        <AiOutlineLoading3Quarters className="animate-spin" />
       )}
       {submitPredictionRequest.isLoading ? "Predicting" : sarcasmState.message}
      </p>
     </div>
    </section>
   </form>
  </div>
 );
}

export default App;
