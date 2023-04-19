import { Card } from "react-bootstrap";

import { SetStringFunction } from "../../types/index";
import { getClassNameSidebarTab } from "../../utils/utils";

import Sidebar from "../admin/nav-and-sidebars/Sidebar";

import HomeImage from "../../images/Home-image.png"

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction,
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="rounded-0 sidebar-content-container-home">
      <Card.Body className="mt-5 d-flex flex-column align-items-center p-0">
        <img src={HomeImage} alt="Supanova" className="home-course-image" />
        <h5 className="course-title-home">Radiation Safety Training Course</h5>
        <div className="row w-100">
          <div className="col-20 p-0">
            <Sidebar
              setActiveTab={setActiveTab}
              classNameTab1={getClassNameSidebarTab(activeTab, "Courses")}
              classNameTab2={getClassNameSidebarTab(activeTab, "Instructor")}
              tabTitle1="Courses"
              tabTitle2="Instructor" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SidebarContainer;
