import React from "react";

import { SetStringFunction } from "../../../types/index";

import Sidebar from "../../nav/Sidebar";
import { ADMINS_TABS } from "src/constants/constants";

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction;
}

const SidebarContainer: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const adminTabs = (Object.values(ADMINS_TABS));

  return (
    <div className="row sidebar-content-container-admin">
      <div className="col-20">
        <Sidebar
          setActiveTab={setActiveTab}
          tabs={adminTabs}
          activeTab={activeTab} />
      </div>
    </div>
  );
};

export default SidebarContainer;
