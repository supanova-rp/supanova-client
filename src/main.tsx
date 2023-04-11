import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import "video.js/dist/video-js.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import { AuthProvider } from "./contexts/AuthContext";

import Home from "./components/home/Home";
import PageNotFound from "./components/PageNotFound";
import Admin from "./components/admin/Admin";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);