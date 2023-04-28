import { Card } from "react-bootstrap";
import React from "react";

const ExistingCoursesContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

export default ExistingCoursesContainer;
