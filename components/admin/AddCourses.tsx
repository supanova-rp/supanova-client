/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import uuid from 'react-uuid';

import FilePicker from '@/components/admin/FilePicker';
import { getUpdatedSectionsWithAddedVideoInfo } from '@/utils/utils';
import { API_DOMAIN } from '@/constants/constants';
import Navbar from './Navbar';
import RemoveUserInput from './RemoveUser';
import FormGroup from './FormGroup';
import AddMoreInputs from './AddMoreInputs';

export default class AddCourses extends React.Component {
  initialState = {
    title: '',
    courseDescription: '',
    sections: [{
      id: uuid(),
      title: '',
      video: {
        name: '',
        url: null,
        uploadProgress: null,
      },
    }],
    loading: false,
    serverError: null,
    videoMissingError: null,
    successMessage: null,
  };

  state = this.initialState;

  onChangeSection = (index: string, e) => {
    const updatedSectionsWithNewTitle = this.state.sections.map((section) => {
      if (section.id === index) {
        return {
          ...section,
          title: e.target.value,
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
        id: uuid(),
        title: '',
        video: {
          name: '',
          url: null,
          uploadProgress: null,
        },
      },
    ];

    this.setState({ sections: sectionsWithNewlyAddedSection });
  };

  onClickRemoveSection = (sectionId: string) => {
    const updatedSectionsMinusRemovedSection = this.state.sections.filter((section) => sectionId !== section.id);

    this.setState({ sections: updatedSectionsMinusRemovedSection });
  };

  onFileSelected = (sectionId: string, videoName: string) => {
    const sectionsWithUpdatedVideoName = getUpdatedSectionsWithAddedVideoInfo(this.state.sections, sectionId, 'name', videoName);

    this.setState({ sections: sectionsWithUpdatedVideoName });
  };

  onFileUploaded = (sectionId: string, videoUrl: string) => {
    const sectionsWithUpdatedVideoUrl = getUpdatedSectionsWithAddedVideoInfo(this.state.sections, sectionId, 'url', videoUrl);

    this.setState({ sections: sectionsWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data, sectionId: string) => {
    const sectionsWithUpdatedVideoUploadProgress = getUpdatedSectionsWithAddedVideoInfo(this.state.sections, sectionId, 'uploadProgress', data.progress);

    this.setState({ sections: sectionsWithUpdatedVideoUploadProgress });
  };

  handleSuccessMessageAfterCourseCreation = () => {
    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onHandleFormSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, serverError: null, videoMissingError: null });

    if (this.state.sections.every((section) => section.video.url !== null)) {
      try {
        const response = await fetch(`${API_DOMAIN}/add-course`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.state.title,
            description: this.state.courseDescription,
            sections: [...this.state.sections],
          }),
        });

        const result = await response.json();

        if (!result.error) {
          this.setState({ ...this.initialState, successMessage: 'Successfully created new course!' });

          this.handleSuccessMessageAfterCourseCreation();
        }
      } catch (e) {
        console.log(e);

        this.setState({ serverError: 'Creating course failed. Try again.', loading: false });
      }
    } else {
      this.setState({ videoMissingError: 'Please make sure videos are uploaded for every section.', loading: false });
    }
  };

  onUpdateStateAfterCancellingFileUpload = (sectionId: string) => {
    const updatedSections = this.state.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          video: {
            name: '',
            url: null,
            uploadProgress: null,
          },
        };
      }

      return section;
    });
    this.setState({ sections: updatedSections });
  };

  render() {
    return (
      <Card className="w-100 p-3 d-flex rounded-0">
        <Card.Body>
          <Navbar title="Add a New Course" />

          {this.state.serverError
            ? <Alert variant="danger">{this.state.serverError}</Alert>
            : null
          }
          {this.state.videoMissingError
            ? <Alert variant="warning">{this.state.videoMissingError}</Alert>
            : null
          }
          {this.state.successMessage
            ? <Alert variant="success">{this.state.successMessage}</Alert>
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
              value={this.state.courseDescription}
              onChange={(e) => this.setState({ courseDescription: e.target.value })} />

            <h5 className="mt-4 mb-2">Add your Course Sections</h5>
            {this.state.sections.map((section, index) => {
              return (
                <div className="d-flex align-items-center" key={`chapter-${index}`}>
                  <div>
                    <FormGroup
                      formId="course-section"
                      className="my-4 chapter-input"
                      label="Course Section"
                      type="text"
                      value={section.title}
                      onChange={(e) => this.onChangeSection(section.id, e)}
                      Component={(
                        <FilePicker
                          sectionId={section.id}
                          videoName={section.video.name}
                          onFileSelected={this.onFileSelected}
                          onFileUploaded={this.onFileUploaded}
                          onFileUploadProgress={this.onFileUploadProgress}
                          uploadProgress={section.video.uploadProgress}
                          onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload} />
                      )} />
                  </div>
                  <div>

                    {index !== 0
                      ? <RemoveUserInput onClickFunction={() => this.onClickRemoveSection(section.id)} />
                      : null
                    }

                  </div>
                </div>
              );
            })}

            <AddMoreInputs title="Add another section" onClick={this.onClickAddNewSection} />
            <Button type="submit" className="w-30" disabled={this.state.loading}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
