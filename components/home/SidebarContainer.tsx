import { Card } from 'react-bootstrap';
import Image from 'next/image';

import HomeImage from '@/images/Home-image.png';
import Sidebar from '@/components/admin/Sidebar';
import { SetStringFunction } from '@/index';
import { getClassNameSidebarTab } from '@/utils/utils';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction,
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="rounded-0 sidebar-container-home">
      <Card.Body className="mt-3 w-100">
        <Image src={HomeImage} alt="Stakeholder" height="300" width="300" priority />
        <h5 className="mt-3">The Complete Radiation Course</h5>
        <h6>71 % Complete</h6>
        <div className="row sidebar-container">
          <div className="col-20 p-0">
            <Sidebar
              setActiveTab={setActiveTab}
              classNameTab1={getClassNameSidebarTab(activeTab, 'Curriculum')}
              classNameTab2={getClassNameSidebarTab(activeTab, 'Instructor')}
              tabTitle1="Curriculum"
              tabTitle2="Instructor" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SidebarContainer;
