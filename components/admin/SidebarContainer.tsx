/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { SetStringFunction } from '@/index';

import Sidebar from './Sidebar';
import { getClassNameSidebarTab } from '@/utils/utils';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction;
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {

  return (
    <div className="row sidebar-container">
      <div className="col-20">
        <Sidebar 
        setActiveTab={setActiveTab}
        classNameTab1={getClassNameSidebarTab(activeTab, 'Courses')}
        classNameTab2={getClassNameSidebarTab(activeTab, 'Users')}
        tabTitle1="Courses"
        tabTitle2="Users"/>
      </div>
    </div>
  );
};

export default SidebarContainer;
