import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
=======
import store from "./redux/store";
import App from "./App";
>>>>>>> 33e004eabbfd95329520c92ab613b63510d6cd14
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
