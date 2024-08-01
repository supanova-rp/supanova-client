import React from "react";
import { ADMINS_TABS } from "src/constants/constants";

import { AdminTabValue, setActiveTabFunction } from "../../../types/index";
import Sidebar from "../../nav/Sidebar";

interface Props {
  activeTab: AdminTabValue;
  isAdminDashboard?: boolean;
  setActiveTab: setActiveTabFunction;
}

const AdminSidebarContainer: React.FC<Props> = ({
  activeTab,
  isAdminDashboard,
  setActiveTab,
}) => {
  const adminTabs = Object.values(ADMINS_TABS);

  return (
    <div className="row sidebar-content-container-admin">
      <div className="col-20">
        <Sidebar
          setActiveTab={setActiveTab}
          isAdminDashboard={isAdminDashboard}
          tabs={adminTabs}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default AdminSidebarContainer;
