/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { colors } from "src/constants/colorPalette";

import { useAuth } from "src/contexts/AuthContext";

const RedirectLoggedInUser = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }

    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <PulseLoader color={colors.orange} />
      </div>
    );
  }

  return <>{ children }</>;
};

export default RedirectLoggedInUser;