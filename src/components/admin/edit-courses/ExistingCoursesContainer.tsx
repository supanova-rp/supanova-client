import { Card } from "react-bootstrap";
import Navbar from "../nav-and-sidebars/Navbar";

interface Props {
  renderContent: () => React.ReactElement
}

const ExistingCoursesContainer: React.FC<Props> = ({ renderContent }) => {
  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Edit Courses" />
        {renderContent()}
      </Card.Body>
    </Card>
   );
}

export default ExistingCoursesContainer;
