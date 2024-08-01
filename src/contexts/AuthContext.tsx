import {
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { unauthedRoutes } from "src/constants/constants";
import { FirebaseUser } from "src/types";

import { auth } from "../firebase/firebase";

export type AuthContextType = {
  currentUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [signedInStatus, setSignedInStatus] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (signedInStatus === "signed_out" && !unauthedRoutes.includes(location)) {
      navigate("/login", { replace: true });
    }
  }, [signedInStatus]);

  const setAdminStatus = async (user: FirebaseUser) => {
    try {
      const response = await user?.getIdTokenResult();
      const result = await response?.claims.admin;

      setIsAdmin(result);
    } catch (e) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user: FirebaseUser | null) => {
        if (user) {
          await setAdminStatus(user);
        } else {
          setIsAdmin(false);
        }

        setCurrentUser(user);
        setIsLoading(false);
        setSignedInStatus(user ? "signed_in" : "signed_out");
      },
    );

    return unsubscribe;
  }, []);

  const value = useMemo(() => {
    const login = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
      return signOut(auth);
    };

    const resetPassword = (email: string) => {
      return sendPasswordResetEmail(auth, email);
    };

    return {
      currentUser,
      login,
      logout,
      resetPassword,
      isAdmin,
      isLoading,
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when the currentUser has been set */}
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};
