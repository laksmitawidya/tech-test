import { NextUIProvider } from "@nextui-org/react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </ThemeProvider>
);
