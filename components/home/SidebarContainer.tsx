import { Card } from 'react-bootstrap';
import Image from 'next/image';

import { SetStringFunction } from '@/index';
import { getClassNameSidebarTab } from '@/utils/utils';

import Sidebar from '@/components/admin/nav-and-sidebars/Sidebar';

import SupanovaLogo from '@/images/Supanova-logo.png';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction,
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="rounded-0 sidebar-container-home">
      <Card.Body className="mt-3 w-100 d-flex flex-column align-items-center">
        <Image src={SupanovaLogo} alt="Supanova" height="220" width="300" priority />
        <h5 className="mt-3">The Complete Radiation Protection Course</h5>
        <div className="row sidebar-container">
          <div className="col-20 p-0">
            <Sidebar
              setActiveTab={setActiveTab}
              classNameTab1={getClassNameSidebarTab(activeTab, 'Courses')}
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
