import React from "react";

import { SetStringFunction } from "../../../types/index";
import { getClassNameSidebarTab } from "../../../utils/utils";
import { ADMINS_TABS } from "src/constants/constants";

import Sidebar from "../../nav/Sidebar";

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction;
}

const { ADD_COURSE, EDIT_COURSES, ADD_USERS } = ADMINS_TABS;

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {

  return (
    <div className="row sidebar-content-container-admin">
      <div className="col-20">
        <Sidebar
          setActiveTab={setActiveTab}
          classNameTab1={getClassNameSidebarTab(activeTab, ADD_COURSE)}
          classNameTab2={getClassNameSidebarTab(activeTab, EDIT_COURSES)}
          classNameTab3={getClassNameSidebarTab(activeTab, ADD_USERS)}
          tabTitle1={ADD_COURSE}
          tabTitle2={EDIT_COURSES}
          tabTitle3={ADD_USERS} />
      </div>
    </div>
  );
};

export default SidebarContainer;
