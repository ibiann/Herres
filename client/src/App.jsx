import React from "react";
import "./App.scss";
import AppBar from "./components/AppBar/AppBar";
import AppBoard from "./components/AppBoard/AppBoard";
import BoardCon from "./components/BoardCon/BoardCon";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="merres">
      <AppBar />
      <AppBoard />
      <BoardCon />
    </div>
  );
}

export default App;
