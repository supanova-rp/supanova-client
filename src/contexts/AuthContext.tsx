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

interface Props {
  children: React.ReactNode
}

type AuthContextType = {
  currentUser: FirebaseUser | null,
  signup: (email: string, password: string) => Promise<FirebaseUserCredential>,
  login: (email: string, password: string) => Promise<FirebaseUserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  updateUser: (newUser: UserCredential, name: string) => Promise<void>,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
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
          })
        } catch (e) {
          console.log(e)
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
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
  };

  // const value = useMemo(() => {
  //   const signup = (email: string, password: string) => {
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   };

  //   const login = (email: string, password: string) => {
  //     // send a request to the /login endpoint with the access_token of the user in the request body
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

  //   const logout = () => {
  //     return signOut(auth);
  //   };

  //   const resetPassword = (email: string) => {
  //     return sendPasswordResetEmail(auth, email);
  //   };

  //   return {
  //     currentUser,
  //     signup,
  //     login,
  //     logout,
  //     resetPassword,
  //   };
  // }, [currentUser]);

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
