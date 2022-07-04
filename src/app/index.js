import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById('app')

console.log(container)
const root = createRoot(container)
root.render(<App></App>)