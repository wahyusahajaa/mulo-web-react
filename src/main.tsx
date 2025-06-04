import "@/styles/index.css";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router";
import router from "./routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
