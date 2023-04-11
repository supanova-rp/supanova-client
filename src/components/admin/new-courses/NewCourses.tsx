/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import { getInitialCourseState, getUpdatedSections } from "../../../utils/utils";
import { API_DOMAIN } from "../../../constants/constants";

import Navbar from "../nav-and-sidebars/Navbar";
import FormGroup from "../FormGroup";
import AddMoreInputs from "../AddMoreInputs";
import EditSection from "../EditSection";

export default class AddCourses extends Component {
  state = getInitialCourseState();

  onChangeSectionTitle = (sectionId: number, newInputValue: string) => {
    const updatedSectionsWithNewTitle = this.state.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          title: newInputValue,
        };
      }

      return section;
    });

    this.setState({ sections: updatedSectionsWithNewTitle });
  };

  onClickAddNewSection = () => {
    const sectionsWithNewlyAddedSection = [
      ...this.state.sections,
      {
        id: Date.now(),
        title: "",
        video: {
          name: "",
          url: null,
          uploadProgress: null,
        },
      },
    ];

    this.setState({ sections: sectionsWithNewlyAddedSection });
  };

  handleRemoveSection = (sectionId: number) => {
    const updatedSectionsMinusRemovedSection = this.state.sections.filter((section) => sectionId !== section.id);

    this.setState({ sections: updatedSectionsMinusRemovedSection });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const sectionsWithUpdatedVideoUrl = getUpdatedSections(this.state.sections, sectionId, "videoUrl", videoUrl);

    this.setState({ sections: sectionsWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const sectionsWithUpdatedVideoUploadProgress = getUpdatedSections(this.state.sections, sectionId, "uploadProgress", data.progress);

    this.setState({ sections: sectionsWithUpdatedVideoUploadProgress });
  };

  handleSuccessMessageAfterCourseCreation = () => {
    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onHandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({
      loading: true,
      error: {
        message: null,
        type: null,
      },
    });

    if (this.state.sections.every((section) => section.videoUrl !== null)) {
      try {
        const sectionsWithPositions = this.state.sections.map((section, index) => {
          return {
            ...section,
            position: index,
          };
        });

        const response = await fetch(`${API_DOMAIN}/add-course`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            sections: sectionsWithPositions,
          }),
        });

        const result = await response.json();

        if (!result.error) {
          this.setState({ ...getInitialCourseState(), successMessage: "Successfully created new course!" });

          this.handleSuccessMessageAfterCourseCreation();
        } else {
          this.setState({
            loading: false,
            error: {
              message: "Creating course failed. Try again.",
              type: "danger",
            },
          });
        }
      } catch (error) {
        console.log(error);

        this.setState({
          loading: false,
          error: {
            message: "Creating course failed. Try again.",
            type: "danger",
          },
        });
      }
    } else {
      this.setState({
        loading: false,
        error: {
          message: "Please make sure videos are uploaded for every section.",
          type: "warning",
        },
      });
    }
  };

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const updatedSections = this.state.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          videoUrl: null,
          uploadProgress: null,
        };
      }

      return section;
    });
    this.setState({ sections: updatedSections });
  };

  render() {
    const { error, successMessage } = this.state;

    return (
      <Card className="w-100 p-3 d-flex rounded-0">
        <Card.Body>
          <Navbar title="Add a New Course" />

          {error?.message
            ? (
              <Alert variant={error.type || "warning"}>
                {error.message}
              </Alert>
            )
            : null
          }

          {successMessage
            ? <Alert variant="success">{successMessage}</Alert>
            : null
          }

          <Form onSubmit={this.onHandleFormSubmit}>
            <FormGroup
              formId="title"
              className="mb-2"
              label="Course Title"
              type="text"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })} />
            <FormGroup
              formId="description"
              className="mb-2"
              label="Course Description"
              type="text"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })} />

            <h5 className="mt-4 mb-2">Add your Course Sections</h5>
            {this.state.sections.map((section, index) => {
              return (
                <EditSection
                  key={section.id}
                  index={index}
                  section={section}
                  canRemove={this.state.sections.length > 1}
                  onChangeSectionTitle={this.onChangeSectionTitle}
                  onFileUploaded={this.onFileUploaded}
                  onFileUploadProgress={this.onFileUploadProgress}
                  onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                  handleRemoveSection={this.handleRemoveSection} />
              );
            })}

            <AddMoreInputs title="Add another section" onClick={this.onClickAddNewSection} />
            <Button type="submit" className="w-30 main-button" disabled={this.state.loading}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
