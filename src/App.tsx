import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Home from "./components/home/Home";
import PageErrorScreen from "./components/PageErrorScreen";
import Admin from "./components/admin/Admin";
import AdminRoute from "./components/admin/AdminRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import RedirectLoggedInUser from "./components/authentication/RedirectLoggedInUser";

const App = () => {
  return (
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
            element={(
              <RedirectLoggedInUser>
                <Login />
              </RedirectLoggedInUser>
            )} />
          <Route
            path="/register"
            element={(
              <RedirectLoggedInUser>
                <Register />
              </RedirectLoggedInUser>
            )} />
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
};

export default App;