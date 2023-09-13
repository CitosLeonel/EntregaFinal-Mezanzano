import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyAVUtjrlHO-95BqNnU6a78MfKOasuiAHu8",
  authDomain: "canna-seeds-hub.firebaseapp.com",
  projectId: "canna-seeds-hub",
  storageBucket: "canna-seeds-hub.appspot.com",
  messagingSenderId: "975603392839",
  appId: "1:975603392839:web:6ee20df1b43621f3f0ec62",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
