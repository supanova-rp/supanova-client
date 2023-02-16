import { useRouter } from 'next/router';

export const useRefreshData = () => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return refreshData;
};
