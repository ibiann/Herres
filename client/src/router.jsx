import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBoardPage from "./pages/CreateBoardPage";
import BoardPage from "./pages/BoardPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/landing"} element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreateBoardPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
};

export default AppRouter;
