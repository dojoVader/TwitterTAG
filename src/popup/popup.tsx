import React from "react";
import {createRoot} from "react-dom/client";
import {FaxMailComponent} from "../component/FaxMailComponent";

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<FaxMailComponent name={"Faxmail"}/>)