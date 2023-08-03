import React from "react";
import { Button } from "react-bootstrap";

import { SetStringFunction } from "../../types/index";
import { getClassNameSidebarTab } from "src/utils/utils";

interface Props {
  activeTab: string,
  tabs: string[],
  setActiveTab: SetStringFunction,
}

const Sidebar: React.FC<Props> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className="nav flex-column nav-pills"
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
