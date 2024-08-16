import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CourseImage1 from "src/assets/images/course-placeholder-1.png";
import CourseImage2 from "src/assets/images/course-placeholder-2.png";
import { useAppContext } from "src/contexts/AppContext";
import { Course } from "src/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const navigate = useNavigate();
  const { setActiveTab } = useAppContext();
  const { title, description } = course;

  const isEven = index % 2 === 0;

  const onClickCard = () => {
    navigate(`course/${course.id}`);
    setActiveTab(null);
  };

  return (
    <Card
      onClick={onClickCard}
      className="course-dashboard-item"
      style={{ borderRadius: "10px", position: "relative", width: "250px" }}
    >
      <Card.Img
        variant="top"
        src={isEven ? CourseImage1 : CourseImage2}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <div className="course-dashboard-item-overlay" />
    </Card>
  );
};

export default CourseCard;
