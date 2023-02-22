import {
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import {
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential as FirebaseUserCredential,
} from 'firebase/auth';

import { auth } from '@/firebase';

interface Props {
  children: React.ReactNode
}

type AuthContextType = {
  currentUser: FirebaseUser | null,
  signup: (email: string, password: string) => Promise<FirebaseUserCredential>,
  login: (email: string, password: string) => Promise<FirebaseUserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      setCurrentUser(user);
      setIsLoading(false);

      if (user) {
        user.getIdToken().then((token) => {
          window.localStorage.setItem('auth_token', token);
        });
      }
    });

    return unsubcribe;
  }, []);

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

    return {
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
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
