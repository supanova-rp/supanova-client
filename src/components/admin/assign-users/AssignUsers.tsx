import Accordion from "src/components/admin/AdminAccordion";
import AdminHeader from "../AdminHeader";
import { useState } from "react";

const AssignUsers = () => {
  const [isLoading, setIsLoading] = useState(true);

  const users = [
    {
      name: "Marie",
      email: "marie20767@gmail.com",
      assignedCourses: [
        {
          id: 1,
          title: "Radiation Protection",
        },
        {
          id: 2,
          title: "Radiation Basics",
        },
      ]
    },
    {
      name: "Jamie",
      email: "jamiegarner123@gmail.com",
      assignedCourses: [
        {
          id: 1,
          title: "Radiation Protection"
        },
        {
          id: 3,
          title: "Radiation for large companies"
        }
      ]
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Radiation Protection"
    },
    {
      id: 2,
      title: "Radiation Basics",
    },
    {
      id: 3,
      title: "Radiation for large companies"
    },
    {
      id: 4,
      title: "Radiation for bosses"
    },
    {
      id: 5,
      title: "THE END!",
    }

  ];

  return (
    <>
      <AdminHeader title="Assign Users to Courses" />
      <Accordion
        users={users}
        courses={courses}/>
    </>
  );
};

export default AssignUsers;