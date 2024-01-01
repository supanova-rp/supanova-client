import { Link } from "react-router-dom";
import CourseImage from "src/images/Placeholder-image.png";
import { Course } from "src/types";

interface CourseCardProps {
  course: Course,
}

const CourseCard : React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`course/${course.id}`}>
      <article className="course-card-container">
        <img
          src={CourseImage}
          alt={course.title}
          className="course-card-image" />
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description">{course.description}</p>
      </article>
    </Link>

  );
};

export default CourseCard;