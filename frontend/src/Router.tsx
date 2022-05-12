import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

type Props = {};

const Router = (props: Props) => {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
   </Routes>
  </BrowserRouter>
 );
};

export default Router;
