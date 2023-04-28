import { Component } from "react";

import {Course} from "../../../types/index";
import {getRequest} from "../../../utils/utils";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

import ExistingCoursesContainer from "./ExistingCoursesContainer";
import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";
import EditingCourseContainer from "./EditingCourseContainer";
import CoursesListContainer from "./CourseListContainer";

type ExistingCoursesState = {
  isLoading: boolean,
  successMessage: null | string,
  getCoursesErrorMessage: null | string,
  allCourses: [] | Course[],
  editingCourseId: null | number,
}

export default class EditCourses extends Component {
  state: ExistingCoursesState = {
    isLoading: true,
    editingCourseId: null,
    successMessage: null,
    getCoursesErrorMessage: null,
    allCourses: [],
  };
  context: AuthContextType;

  static contextType = AuthContext;

  getCourses = () => {
    this.setState({ isLoading: true, getCoursesErrorMessage: null });

    getRequest({
      endpoint: "/courses",
      onSuccess: this.onSuccess,
      onError: (error: string) => this.onError("Loading courses failed", error),
      onUnauthorised: this.onUnauthorised,
    });
  };

  componentDidMount () {
    this.getCourses();
  };

  onClickHandleEditingCourse = (courseId: number | null) => {
    this.setState({ editingCourseId: courseId });
  };

  onEditCourseFinished = () => {
    this.setState({ editingCourseId: null });
  };

  handleSuccessMessageAfterSavingEditedCourse = () => {
    this.setState({
      successMessage: "Successfully saved edited course!",
      editingCourseId: null,
    });

    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onSuccess = (result: Course[]) => {
    this.setState({
      allCourses: result,
      isLoading: false
    });
  };

  onError = (getCoursesErrorMessage: string, error = "") => {
    console.log(">>> error: ", error || getCoursesErrorMessage);

    this.setState({
      getCoursesErrorMessage,
      isLoading: false,
    });
  };

  onUnauthorised = () => {
    const { logout } = this.context;

    logout();
  };

  render() {
    const {
      isLoading,
      allCourses,
      editingCourseId,
      getCoursesErrorMessage,
      successMessage,
    } = this.state;

    const editingCourse = allCourses.find((course) => course.id === editingCourseId);

    return (
      <ExistingCoursesContainer>
        <CourseErrorLoadingHandler
          isLoading={isLoading}
          error={getCoursesErrorMessage}
          courses={allCourses}
          onClick={this.getCourses}>

          {editingCourse
            ? (
              <EditingCourseContainer
                initialCourse={editingCourse}
                editingCourseId={editingCourseId}
                onUnauthorised={this.onUnauthorised}
                handleSuccessMessageAfterSavingEditedCourse={this.handleSuccessMessageAfterSavingEditedCourse}
                onClickHandleEditingCourse={this.onClickHandleEditingCourse}
                onEditCourseFinished={this.onEditCourseFinished} />
            )
            : (
              <CoursesListContainer
                courses={allCourses}
                successMessage={successMessage}
                onClickHandleEditingCourse={this.onClickHandleEditingCourse}/>
            )
          }
        </CourseErrorLoadingHandler>
      </ExistingCoursesContainer>
    );
  }
}