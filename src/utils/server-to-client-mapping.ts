import {
  Course,
  CourseMaterial,
  CourseVideoSection,
  SectionTypes,
} from "src/types";
import {
  CourseMaterialServerModel,
  CourseSectionServerModel,
  CourseServerModel,
  CourseVideoSectionServerModel,
} from "src/types/server";

const videoServerModelFrom = (
  section: CourseVideoSectionServerModel,
): CourseVideoSection => {
  return {
    id: section.id,
    type: SectionTypes.Video,
    title: section.title,
    storageKey: section.storageKey,
    storageKeyBeingUploaded: "",
    isNewSection: false,
    uploaded: true,
  };
};

const materialServerModelFrom = (
  material: CourseMaterialServerModel,
): CourseMaterial => {
  return {
    id: material.id,
    name: material.name,
    storageKey: material.storageKey,
    storageKeyBeingUploaded: "",
    uploaded: true,
  };
};

const isVideoSection = (
  section: CourseSectionServerModel,
): section is CourseVideoSectionServerModel => {
  return section.type === SectionTypes.Video;
};

export const courseResponseToEditCourses = (
  course: CourseServerModel,
): Course => {
  const editableSections = course.sections.map(section => {
    if (isVideoSection(section)) {
      return videoServerModelFrom(section);
    }

    return section;
  });

  const editableCourseMaterials = course.materials.map(materialServerModelFrom);

  return {
    ...course,
    sections: editableSections,
    materials: editableCourseMaterials,
  };
};

export const coursesResponseToEditCourses = (
  courses: CourseServerModel[],
): Course[] => {
  return courses.map(courseResponseToEditCourses);
};
