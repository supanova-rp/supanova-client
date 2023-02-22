import { Card } from 'react-bootstrap';
import Image from 'next/image';

import { SetStringFunction } from '@/index';
import { getClassNameSidebarTab } from '@/utils/utils';

import Sidebar from '@/components/admin/nav-and-sidebars/Sidebar';

import AtomImage from '@/images/home-image.png';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction,
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="rounded-0 sidebar-container-home">
      <Card.Body className="mt-3 w-100 d-flex flex-column align-items-center">
        <Image src={AtomImage} alt="Supanova" height="200" width="200" priority />
        <h5 className="course-title-home">Radiation Safety Training Course</h5>
        <div className="row sidebar-container">
          <div className="col-20 p-0">
            <Sidebar
              setActiveTab={setActiveTab}
              classNameTab1={getClassNameSidebarTab(activeTab, 'Courses')}
              classNameTab2={getClassNameSidebarTab(activeTab, 'Instructor')}
              tabTitle1="Courses"
              tabTitle2="Instructor" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SidebarContainer;
