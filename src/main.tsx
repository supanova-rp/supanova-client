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
import PageErrorScreen from "./components/PageErrorScreen";
import Admin from "./components/admin/Admin";
import AdminRoute from "./components/admin/AdminRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageErrorScreen
      title="Oops"
      text="The page you were looking for could not be found..." />
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
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