import React from "react";
import { Button } from "react-bootstrap";

import { getClassNameSidebarTab } from "src/utils/utils";

interface Props {
  activeTab: string | null,
  isAdminDashboard?: boolean,
  tabs: string[],
  setActiveTab: (s: any) => void,
}

const Sidebar: React.FC<Props> = ({
  tabs,
  isAdminDashboard = false,
  activeTab,
  setActiveTab,
}) => {
  const positionFixedClassname = isAdminDashboard ? "position-fixed w-100" : "";

  return (
    <div
      className={`nav flex-column nav-pills ${positionFixedClassname}`}
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical">
      {tabs.map((tab, index) => {
        return (
          <Button
            key={tab}
            className={`rounded-0 ${getClassNameSidebarTab(activeTab, tab)} text-start ps-3 tab-${index + 1}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </Button>
        );
      })}
    </div>
  );
};

export default Sidebar;
