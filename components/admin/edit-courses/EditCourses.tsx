import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

import { ServerSideCourses } from '@/index';

import Navbar from '../nav-and-sidebars/Navbar';
import Course from './Course';

interface Props {
  courses: ServerSideCourses
}

const EditCourses: React.FC<Props> = ({ courses }) => {
  const [allCourses, setAllCourses] = useState(courses);

  const onClickStartEditingCourse = (courseId: number) => {
    const updatedCoursesWithEditFlag = allCourses.map((course) => {
      if (course.course_id === courseId) {
        return {
          ...course,
          isEditing: true,
        };
      }

      return course;
    });

    setAllCourses(updatedCoursesWithEditFlag);
  };

  // TODO: make it so you don't have to refresh edit courses after you just created a course

  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Edit Courses" />
        <div>
          {allCourses.map((course, index) => {
            return (
              <Course
                key={course.course_id}
                index={index}
                course={course}
                onClickStartEditingCourse={onClickStartEditingCourse} />
            );
          })}
        </div>
      </Card.Body>
    </Card>

  );
};

export default EditCourses;
