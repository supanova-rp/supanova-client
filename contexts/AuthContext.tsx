import { User as FirebaseUser } from 'firebase/auth';

import { auth } from '@/firebase';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user: FirebaseUser) => {
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
      return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email: string, password: string) => {
      return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
      return auth.signOut();
    };

    const resetPassword = (email: string) => {
      return auth.sendPasswordResetEmail(email);
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
