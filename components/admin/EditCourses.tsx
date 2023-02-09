import { Card } from 'react-bootstrap';

import Navbar from './Navbar';

const EditCourses = () => {
  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Edit Courses" />
      </Card.Body>
    </Card>

  );
};

export default EditCourses;
