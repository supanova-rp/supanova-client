import { SetStringFunction } from "@/index";
import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  classNameTab1: string,
  classNameTab2: string,
  setActiveTab: SetStringFunction,
  tabTitle1: string,
  tabTitle2: string,
}

const Sidebar: React.FC<Props> = ({ classNameTab1, classNameTab2, setActiveTab, tabTitle1, tabTitle2 }) => {
  return ( 
    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <Button className={`rounded-0 ${classNameTab1} text-start ps-3`} onClick={() => setActiveTab(tabTitle1)}>{tabTitle1}</Button>
      <Button className={`rounded-0 ${classNameTab2} text-start ps-3`} onClick={() => setActiveTab(tabTitle2)}>{tabTitle2}</Button>
    </div>
   );
}
 
export default Sidebar;