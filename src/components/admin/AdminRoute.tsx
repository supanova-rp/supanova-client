import { PulseLoader } from "react-spinners";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import { useAuth } from "src/contexts/AuthContext";

import PageErrorScreen from "../PageErrorScreen";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
  const { isLoading, isAdmin } = useAuth();

  // TODO: test if this still works as a non admin
  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <PulseLoader color={colors.orange} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <PageErrorScreen title="Oops!" text={feedbackMessages.adminAccessError} />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
