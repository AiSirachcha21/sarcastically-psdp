import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";

axios.defaults.baseURL = process.env.REACT_APP_API;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
 document.getElementById("root") as HTMLElement
);
root.render(
 <React.StrictMode>
  <QueryClientProvider client={queryClient}>
   <Router />
  </QueryClientProvider>
 </React.StrictMode>
);
