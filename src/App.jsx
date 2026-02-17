// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";


export default function App() {
  useEffect(() => {
    fetch("https://travel-backend-plan.onrender.com/");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
