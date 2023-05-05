import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential as FirebaseUserCredential,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import { FirebaseUser } from "src/types";
import { API_DOMAIN } from "src/constants/constants";
import { auth } from "../firebase/firebase";
import useUpdateEffect from "src/hooks/useUpdateEffect";

export type AuthContextType = {
  currentUser: FirebaseUser | null,
  signup: (email: string, password: string) => Promise<FirebaseUserCredential>,
  login: (email: string, password: string) => Promise<FirebaseUserCredential>,
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
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: scenario:
  // delete indexedDB firebaselocalstorage
  // go to root path, it should redirect you to login screen
  // but it doesnt (401 unauthorised error, loading spinner is on)

  const navigate = useNavigate();

  useUpdateEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser]);

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
