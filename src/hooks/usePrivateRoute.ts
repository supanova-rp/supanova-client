import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

// TODO: re-implement this when we do the auth stuff (we might want to change how this
// bit works and where we put it, e.g. maybe we wrap the components in main.tsx or something)
export const usePrivateRoute = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
};