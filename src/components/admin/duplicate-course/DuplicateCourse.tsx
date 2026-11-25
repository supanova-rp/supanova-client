import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import Card from "src/components/Card";
import RequestHandler from "src/components/RequestHandler";
import { colors } from "src/constants/colorPalette";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import { useLazyQuery } from "src/hooks/useLazyQuery";
import { useQuery } from "src/hooks/useQuery";
import { CourseTitle, FormSubmitEvent } from "src/types";
import { CourseServerModel } from "src/types/server";

import AdminHeader from "../AdminHeader";

const DuplicateCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [duplicatedTitle, setDuplicatedTitle] = useState<string | null>(null);

  const {
    data: courses,
    loading: isLoadingCourses,
    error: coursesError,
    refetch: refetchCourses,
  } = useQuery<CourseTitle[]>("/course-titles", {
    defaultError: "Failed to load courses.",
  });

  const { loading: isDuplicating, request: duplicateCourse } =
    useLazyQuery<CourseServerModel>("/duplicate-course", {
      onRequestBegin: () => setDuplicatedTitle(null),
      onSuccess: duplicate => {
        setDuplicatedTitle(duplicate.title);
        setSelectedCourseId("");
        // Refetch in the background so the new copy shows up in the dropdown
        refetchCourses(false);
        toast.success(
          feedbackMessages.duplicateCourseSuccess,
          REACT_TOAST_DURATION,
        );
      },
      onError: () => {
        toast.error(
          feedbackMessages.duplicateCourseError,
          REACT_TOAST_DURATION,
        );
      },
    });

  const onSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();

    duplicateCourse({ courseId: selectedCourseId });
  };

  return (
    <>
      <AdminHeader title="Duplicate Course" />
      <RequestHandler
        error={coursesError}
        onClick={refetchCourses}
        isLoading={isLoadingCourses}
        shouldShowWarning={!courses?.length}
        warningMessage="You don't have any courses yet..."
      >
        {duplicatedTitle ? (
          <Card className="mb-3 content-card-compact card-info">
            <b>{duplicatedTitle}</b> has been created. You can rename it in Edit
            Courses and assign users to it in Assign Users.
          </Card>
        ) : null}

        <Form onSubmit={onSubmit} className="duplicate-course-form">
          <Form.Group controlId="duplicate-course-select">
            <Form.Label>Course to duplicate</Form.Label>
            <Form.Select
              required
              disabled={isDuplicating}
              value={selectedCourseId}
              onChange={e => setSelectedCourseId(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses?.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Select>
            <Form.Text muted>
              Copies the course&apos;s videos, materials and quizzes into a new
              course. Assigned users and their progress are not copied. Courses
              with a lot of video can take a few minutes.
            </Form.Text>
          </Form.Group>
          <Button
            disabled={!selectedCourseId || isDuplicating}
            type="submit"
            className="mt-4 btn btn-primary"
          >
            {isDuplicating ? (
              <PulseLoader color={colors.white} size={8} />
            ) : (
              "Duplicate Course"
            )}
          </Button>
        </Form>
      </RequestHandler>
    </>
  );
};

export default DuplicateCourse;
