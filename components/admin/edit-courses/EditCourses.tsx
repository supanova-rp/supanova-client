import { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';

import { ServerSideCourses } from '@/index';

import Navbar from '../nav-and-sidebars/Navbar';
import Course from './Course';

interface Props {
  courses: ServerSideCourses
}

const EditCourses: React.FC<Props> = ({ courses }) => {
  const [allCourses, setAllCourses] = useState(courses);

  const onClickHandleEditCourse = (courseId: number, value: boolean) => {
    const updatedCoursesWithEditFlag = allCourses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          isEditing: value,
        };
      }

      return course;
    });

    setAllCourses(updatedCoursesWithEditFlag);
  };

  // TODO: make it so you don't have to refresh edit courses after you just created a course

  if (!allCourses?.length) {
    return (
      <Card className="w-100 p-3 d-flex mh-100 rounded-0">
        <Card.Body>
          <Navbar title="Edit Courses" />
          <Alert variant="warning">You don&apos;t have any courses yet.</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Edit Courses" />
        <div>
          {allCourses.map((course, index) => {
            return (
              <Course
                key={course.id}
                index={index}
                course={course}
                onClickHandleEditCourse={onClickHandleEditCourse} />
            );
          })}
        </div>
      </Card.Body>
    </Card>

  );
};

export default EditCourses;
