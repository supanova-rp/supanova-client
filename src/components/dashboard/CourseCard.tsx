import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CourseImage from "src/assets/images/course-image.png";
import { useAppContext } from "src/contexts/AppContext";
import { Course } from "src/types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { setActiveTab } = useAppContext();
  const { title, description } = course;

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
        src={CourseImage}
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
