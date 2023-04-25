import {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

import {
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential as FirebaseUserCredential,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { API_DOMAIN } from "src/constants/constants";
import { FirebaseUser } from "src/types";

type AuthContextType = {
  currentUser: FirebaseUser | null,
  signup: (email: string, password: string) => Promise<FirebaseUserCredential>,
  login: (email: string, password: string) => Promise<FirebaseUserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  updateUser: (newUser: UserCredential, name: string) => Promise<void>,
  getIsAdmin: () => Promise<boolean>
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user: FirebaseUser | null) => {
      if (user) {
        try {
          await fetch(`${API_DOMAIN}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              access_token: user.accessToken,
            }),
          });
        } catch (e) {
          console.log(e);
        }
      }

      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

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
      } catch(e) {
        return false;
      }
  };

  // TODO: add useMemo back in here

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
    getIsAdmin,
  };

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
