import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import Index from "./routes/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Index />
    </AuthProvider>
  </StrictMode>
);
