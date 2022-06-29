import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import CreateBoardPage from "./pages/CreateBoardPage";
import HomePage from "./pages/HomePage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path="/create" element={<CreateBoardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
};

export default AppRouter;
