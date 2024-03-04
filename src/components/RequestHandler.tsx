/* eslint-disable react/jsx-no-useless-fragment */
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";

import ErrorCard from "./ErrorCard";
import WarningCard from "./WarningCard";

interface Props extends React.PropsWithChildren {
  error: string | null,
  onClick: () => void,
  isLoading: boolean,
  isCoursesDashboard?: boolean,
  // courses?: Course[] | CourseTitle[],
  // course?: Course | null,
  // usersToCourses?: UserToCourses[],
  shouldShowWarning: boolean,
  warningMessage: string,
}

const RequestHandler = ({
  error,
  onClick,
  isLoading,
  isCoursesDashboard = false,
  shouldShowWarning,
  warningMessage,
  children
}: Props) => {

  if (error) {
    return (
      <ErrorCard
        errorMessage={error}
        isCoursesDashboard={isCoursesDashboard}
        clickHandlerFunction={onClick} />
    );
  }

  if (isLoading) {
    return (
      <div className="full-screen-loading-container">
        <PulseLoader
          color={colors.orange}
          className="m-5" />
      </div>
    );
  }

  if (shouldShowWarning) {
    return <WarningCard warningMessage={warningMessage} />;
  }

  return <>{children}</>;
};

export default RequestHandler;