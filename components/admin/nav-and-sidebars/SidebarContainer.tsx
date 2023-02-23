/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { SetStringFunction } from '@/index';

import { getClassNameSidebarTab } from '@/utils/utils';
import Sidebar from './Sidebar';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction;
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="row sidebar-content-container-admin">
      <div className="col-20">
        <Sidebar
          setActiveTab={setActiveTab}
          classNameTab1={getClassNameSidebarTab(activeTab, 'Add Course')}
          classNameTab2={getClassNameSidebarTab(activeTab, 'Edit Courses')}
          classNameTab3={getClassNameSidebarTab(activeTab, 'Add Users')}
          tabTitle1="Add Course"
          tabTitle2="Edit Courses"
          tabTitle3="Add Users" />
      </div>
    </div>
  );
};

export default SidebarContainer;
