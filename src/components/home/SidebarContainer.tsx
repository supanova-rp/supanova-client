import { Card } from "react-bootstrap";

import { CourseTabs } from "src/constants/constants";
import HomeImage from "../../images/Home-image.png";

import Sidebar from "../nav/Sidebar";
import { useAppContext } from "src/contexts/AppContext";

const SidebarContainer: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();
  const homeTabs = Object.values(CourseTabs);

  return (
    <Card
      className="rounded-0 sidebar-content-container-home">
      <Card.Body className="mt-5 d-flex flex-column align-items-center p-0">
        <img
          src={HomeImage}
          alt="Supanova"
          className="course-image" />
        <h5 className="course-title-course-view">Radiation Safety Training Course</h5>
        <div className="row w-100">
          <div className="col-20 p-0">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={homeTabs} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SidebarContainer;
