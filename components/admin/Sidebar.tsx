import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="row sidebar-container">
      <div className="col-20">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <Link className="nav-link active" data-toggle="pill" href="/add-courses">Courses</Link>
          <Link className="nav-link" data-toggle="pill" href="/add-users">Users</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
