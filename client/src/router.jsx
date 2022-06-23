import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
};

export default AppRouter;
