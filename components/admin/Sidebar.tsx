/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button } from 'react-bootstrap';

import { SetStringFunction } from '@/index';

interface Props {
  activeTab: string,
  setActiveTab: SetStringFunction;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const classNameCoursesBtn = activeTab === 'courses' ? 'btn-primary' : 'btn-light admin-tab';
  const classNameUsersBtn = activeTab === 'users' ? 'btn-primary' : 'btn-light admin-tab';

  return (
    <div className="row sidebar-container">
      <div className="col-20">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <Button className={`rounded-0 ${classNameCoursesBtn} text-start ps-3`} onClick={() => setActiveTab('courses')}>Courses</Button>
          <Button className={`rounded-0 ${classNameUsersBtn} text-start ps-3`} onClick={() => setActiveTab('users')}>Users</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
