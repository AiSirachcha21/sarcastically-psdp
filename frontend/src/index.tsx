import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = "http://127.0.0.1:5000";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
 document.getElementById("root") as HTMLElement
);
root.render(
 <React.StrictMode>
  <QueryClientProvider client={queryClient}>
   <App />
  </QueryClientProvider>
 </React.StrictMode>
);
