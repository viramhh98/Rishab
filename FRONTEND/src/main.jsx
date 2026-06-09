// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { Toaster } from "./components/ui/sonner";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//     <Toaster richColors position="bottom-right" closeButton />
//   </React.StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Toaster } from "./components/ui/sonner";

import { ThemeProvider } from "../src/providers/theme-provider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <App />

      <Toaster
        richColors
        position="bottom-right"
        closeButton
      />
    </ThemeProvider>
  </React.StrictMode>
);