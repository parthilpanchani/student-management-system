import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ThemeManager from "./components/ThemeManager";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>

    <BrowserRouter>
      <Provider store={store}>

        <ThemeManager />
        <App />
      </Provider>
    </BrowserRouter>

  </AuthProvider>
  // </React.StrictMode>
);