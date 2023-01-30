import { auth } from '@/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  
  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubcribe;
  }, [])



  // const onClickSignUp = async () => {
  //   try {
  //     const newUser = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);

  //     await updateProfile(newUser.user, { displayName: nameInput });

  //     console.log(auth?.currentUser?.email);
  //   } catch (error) {
  //     const errorMessage = error.message || error;

  //     console.log(errorMessage);
  //   }
  // };

  // console.log('>>> user: ', user);


  
  const value = {
    currentUser,
    signUp,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
