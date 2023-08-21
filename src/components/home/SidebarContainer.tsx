import { Card } from "react-bootstrap";

import { SetStringFunction } from "../../types/index";
import { HOME_TABS } from "src/constants/constants";
import HomeImage from "../../images/Home-image.png";

import Sidebar from "../nav/Sidebar";

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction,
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const homeTabs = Object.values(HOME_TABS);

  return (
    <Card className="rounded-0 sidebar-content-container-home">
      <Card.Body className="mt-5 d-flex flex-column align-items-center p-0">
        <img
          src={HomeImage}
          alt="Supanova"
          className="home-course-image" />
        <h5 className="course-title-home">Radiation Safety Training Course</h5>
        <div className="row w-100">
          <div className="col-20 p-0">
            <Sidebar
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              tabs={homeTabs} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SidebarContainer;
