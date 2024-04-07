import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";

import PageErrorScreen from "./components/PageErrorScreen";
import Admin from "./components/admin/Admin";
import AdminRoute from "./components/admin/AdminRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import RedirectLoggedInUser from "./components/authentication/RedirectLoggedInUser";
import CourseContainer from "./components/home/CourseContainer";
import { AppProvider } from "./contexts/AppContext";
import { DashboardContainer } from "./components/dashboard/DashboardContainer";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route
              path="/"
              element={<DashboardContainer />} />
            <Route
              path="/course/:id"
              element={<CourseContainer />} />
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
        </AppProvider>
      </AuthProvider>
      <Toaster position="top-right"/>
    </BrowserRouter>
  );
};

export default App;