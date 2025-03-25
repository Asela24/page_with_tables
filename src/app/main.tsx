import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../themes/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CookiesProvider>
  </StrictMode>
);
