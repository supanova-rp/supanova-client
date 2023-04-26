import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
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

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/admin"
          element={(
            <AdminRoute>
              <Admin />
            </AdminRoute>
          )} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />} />
        <Route
          path="/login"
          element={<Login />} />
        <Route
          path="*"
          element={(
            <PageErrorScreen
              title="Oops"
              text="The page you were looking for could not be found..." />
          )}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);