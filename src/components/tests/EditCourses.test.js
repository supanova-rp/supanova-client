import { getDeletedSectionsIds } from "./edit-course-test-utils";
import { defaultCourses } from "./test-constants";

describe("Checks logic to get deleted section ids when editing a course", () => {
  test("deletes no section ids", () => {
    expect(getDeletedSectionsIds(defaultCourses[0], defaultCourses[0])).toEqual(
      [],
    );
  });

  test("deletes 1 section id with id 7", () => {
    const editedCourse = {
      id: 2,
      title: "Radiation Basics",
      sections: [
        {
          id: 5,
          title: "Welcome!",
        },
        {
          id: 6,
          title: "Tools",
        },
      ],
    };

    expect(getDeletedSectionsIds(editedCourse, defaultCourses[1])).toEqual([7]);
  });

  test("deletes a few section ids with ids 1, 3, 4", () => {
    const editedCourse = {
      id: 1,
      title: "Managing Stakeholders",
      sections: [
        {
          id: 2,
          title: "Definitions",
        },
      ],
    };

    expect(getDeletedSectionsIds(editedCourse, defaultCourses[0])).toEqual([
      1, 3, 4,
    ]);
  });
});
