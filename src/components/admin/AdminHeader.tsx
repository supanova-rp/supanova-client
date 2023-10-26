import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  title: string,
}

const AdminHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="d-flex justify-content-md-between mb-4 align-items-center">
      <h2 className="mb-0">{title}</h2>
      <Button
        variant="link"
        data-testid="back-home"
        className="nav-link admin">
        <Link to="/">
          Back Home
        </Link>
      </Button>
    </div>
  );
};

export default AdminHeader;