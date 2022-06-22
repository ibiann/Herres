import React from "react";
import "../App.scss";
import AppBar from "../components/BoardPage/AppBar";
import AppBoard from "../components/BoardPage/AppBoard";
import BoardCon from "../components/BoardPage/BoardCon";

const BoardsPage = () => {
  return (
    <div className="merres">
      <AppBar />
      <AppBoard />
      <BoardCon />
    </div>
  );
};

export default BoardsPage;
