import React from "react";
import { Button } from "react-bootstrap";
import { ADMINS_TABS } from "src/constants/constants";
import { useAuth } from "src/contexts/AuthContext";
import { getClassNameSidebarTab } from "src/utils/utils";

interface Props {
  activeTab: string | null;
  isAdminDashboard?: boolean;
  tabs: string[];
  setActiveTab: (s: any) => void;
}

const Sidebar: React.FC<Props> = ({
  tabs,
  isAdminDashboard = false,
  activeTab,
  setActiveTab,
}) => {
  const positionFixedClassname = isAdminDashboard ? "position-fixed w-100" : "";
  const { currentUser } = useAuth();

  return (
    <div
      className={`nav flex-column nav-pills ${positionFixedClassname}`}
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      {tabs.map((tab, index) => {
        if (
          tab === ADMINS_TABS.USER_PROGRESS &&
          currentUser?.email !== "jamiegarner123@gmail.com"
        ) {
          return null;
        }

        return (
          <Button
            key={tab}
            className={`rounded-0 ${getClassNameSidebarTab(activeTab, tab)} text-start ps-3 tab-${index + 1}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        );
      })}
    </div>
  );
};

export default Sidebar;
