import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthContext';

export const usePrivateRoute = () => {
  const { currentUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);
};

