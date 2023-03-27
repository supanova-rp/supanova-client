import { useEffect } from "react";
import { redirect } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const usePrivateRoute = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      redirect("/login");
    }
  }, [currentUser]);
};

