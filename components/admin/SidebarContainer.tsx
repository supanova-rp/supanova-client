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
        classNameTab1={getClassNameSidebarTab(activeTab, 'New Courses')}
        classNameTab2={getClassNameSidebarTab(activeTab, 'Existing Courses')}
        classNameTab3={getClassNameSidebarTab(activeTab, 'New Users')}
        tabTitle1="New Courses"
        tabTitle2="Existing Courses"
        tabTitle3="New Users"/>
      </div>
    </div>
  );
};

export default SidebarContainer;
