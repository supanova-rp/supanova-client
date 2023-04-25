import { Card } from "react-bootstrap";
import Navbar from "../nav-and-sidebars/Navbar";
import React from "react";

const ExistingCoursesContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Edit Courses" />
        {children}
      </Card.Body>
    </Card>
   );
};

export default ExistingCoursesContainer;
