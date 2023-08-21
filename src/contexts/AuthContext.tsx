import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import { FirebaseUser } from "src/types";
import { auth } from "../firebase/firebase";
import { unauthedRoutes } from "src/constants/constants";

export type AuthContextType = {
  currentUser: FirebaseUser | null,
  signup: (email: string, password: string) => Promise<UserCredential>,
  login: (email: string, password: string) => Promise<UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  updateUser: (newUser: UserCredential, name: string) => Promise<void>,
  getIsAdmin: () => Promise<boolean>
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [signedInStatus, setSignedInStatus] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (signedInStatus === "signed_out" && !unauthedRoutes.includes(location) ) {
      navigate("/login", { replace: true });
    }
  }, [signedInStatus]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
      setCurrentUser(user);
      setIsLoading(false);
      setSignedInStatus(user ? "signed_in" : "signed_out");
    });

    return unsubscribe;
  }, []);

  // To make sure we have the most updated currentUser
  const value = useMemo(() => {
    const signup = (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
      return signOut(auth);
    };

    const resetPassword = (email: string) => {
      return sendPasswordResetEmail(auth, email);
    };

    const updateUser = (newUser: UserCredential, name: string) => {
      return updateProfile(newUser.user, { displayName: name });
    };

    const getIsAdmin = async () => {
      try {
        const response = await currentUser?.getIdTokenResult();
        const result = await response?.claims.admin;

        return result;
      } catch (e) {
        return false;
      }
    };

    return {
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      updateUser,
      getIsAdmin,
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when the currentUser has been set */}
      {!isLoading
        ? children
        : null
      }
    </AuthContext.Provider>
  );
};
