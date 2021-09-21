import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
// import authentication context & its provider wrapper
import { AuthProvider } from "./Context/AuthContext";


ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

