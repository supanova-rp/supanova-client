/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";
import { useAuth } from "src/contexts/AuthContext";
import { feedbackMessages } from "src/constants/constants";

import PageErrorScreen from "../PageErrorScreen";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { getIsAdmin } = useAuth();

  useEffect(() => {
    const verifyIsAdmin = async () => {
      try {
        const result = await getIsAdmin();

        setIsLoading(false);
        setIsAdmin(result);
      } catch (e) {
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
        text={feedbackMessages.adminAccessError} />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;