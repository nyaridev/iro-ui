// Design Lab entry: mounts the shell.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./shell/App";
import "./lab.css";

const root = document.getElementById("root");
if (!root) throw new Error("Design Lab: #root is missing from index.html");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
