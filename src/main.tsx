import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import router from "./router/routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
