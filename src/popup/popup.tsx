import React from "react";
import {createRoot} from "react-dom/client";
import {TwitterPopup} from "../component/ui/TwitterPopup";

const container = document.createElement("div");
container.id ="entry-point";
document.body.appendChild(container);
const root = createRoot(container);
root.render(<TwitterPopup/>);

