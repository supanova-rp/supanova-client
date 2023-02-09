import { auth } from '@/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
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
