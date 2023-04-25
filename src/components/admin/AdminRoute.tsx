/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";

import { useAuth } from "src/contexts/AuthContext";

import PageErrorScreen from "../PageErrorScreen";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const { getIsAdmin } = useAuth();

  useEffect(() => {
    const verifyIsAdmin = async () => {
      try {
        const isAdmin = await getIsAdmin();

        setIsLoading(false);
        setIsAdmin(isAdmin);
      } catch(e) {
        console.log(">>> isAdminError: ", e);
        setIsLoading(false);
        setIsAdmin(false);
      }
    };

    verifyIsAdmin();

  }, [getIsAdmin]);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <PulseLoader color={colors.orange} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <PageErrorScreen
        title="Oops!"
        text="You are trying to access a page that requires Admin access..." />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;