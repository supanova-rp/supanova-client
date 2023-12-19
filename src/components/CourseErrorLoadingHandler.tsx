/* eslint-disable react/jsx-no-useless-fragment */
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";
import { Course, CourseTitle, UserToCourses } from "src/types";

import ErrorCard from "./ErrorCard";
import WarningCard from "./WarningCard";

interface Props extends React.PropsWithChildren {
  error: string | null,
  onClick: () => void,
  isLoading: boolean,
  courses?: Course[] | CourseTitle[],
  usersToCourses?: UserToCourses[],
}

const CourseErrorLoadingHandler = ({
  error,
  onClick,
  isLoading,
  courses,
  usersToCourses,
  children
}: Props) => {

  if (error) {
    return (
      <ErrorCard
        errorMessage={error}
        clickHandlerFunction={onClick} />
    );
  }

  if (isLoading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center pb-5">
        <PulseLoader
          color={colors.orange}
          className="m-5" />
      </div>
    );
  }

  if (courses && !courses?.length) {
    return <WarningCard warningMessage="You don't have any courses yet..." />;
  }

  if (usersToCourses && !usersToCourses?.length) {
    return <WarningCard warningMessage="You don't have any users yet..." />;
  }

  return <>{children}</>;
};

export default CourseErrorLoadingHandler;