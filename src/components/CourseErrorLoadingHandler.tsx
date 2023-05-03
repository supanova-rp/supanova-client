/* eslint-disable react/jsx-no-useless-fragment */
import { Alert } from "react-bootstrap";
import { PulseLoader } from "react-spinners";

import { colors } from "src/constants/colorPalette";

import Error from "./Error";
import { Course } from "src/types";

interface Props extends React.PropsWithChildren {
  error: string | null,
  onClick: () => void,
  isLoading: boolean,
  courses: Course[],
}

const CourseErrorLoadingHandler = ({
  error,
  onClick,
  isLoading,
  courses,
  children
}: Props) => {
  if (error) {
    return (
      <Error
        errorMessage={error}
        onClick={onClick} />
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

  if (!courses.length) {
    return (
      <Alert
        variant="warning"
        className="mt-4">No courses to see yet...
      </Alert>
    );
  }

  return <>{children}</>;
};

export default CourseErrorLoadingHandler;