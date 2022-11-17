import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import App from "./App";
import { store } from "./store/";
import { Provider } from "react-redux";
import "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
