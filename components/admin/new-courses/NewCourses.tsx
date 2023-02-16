/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { AxiosProgressEvent } from 'axios';

import { getInitialCourseState, getUpdatedSectionsWithAddedVideoInfoNewCoursesTab } from '@/utils/utils';
import { API_DOMAIN } from '@/constants/constants';

import Navbar from '../nav-and-sidebars/Navbar';
import FormGroup from '../FormGroup';
import AddMoreInputs from '../AddMoreInputs';
import EditSection from '../EditSection';

interface Props {
  refreshData: () => void,
}

export default class AddCourses extends React.Component<Props> {
  state = getInitialCourseState();

  onChangeSection = (sectionId: number, newInputValue: string) => {
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

  handleRemoveSection = (sectionId: number) => {
    const updatedSectionsMinusRemovedSection = this.state.sections.filter((section) => sectionId !== section.id);

    this.setState({ sections: updatedSectionsMinusRemovedSection });
  };

  onFileSelected = (sectionId: number, videoName: string) => {
    const sectionsWithUpdatedVideoName = getUpdatedSectionsWithAddedVideoInfoNewCoursesTab(this.state.sections, sectionId, 'videoName', videoName);

    this.setState({ sections: sectionsWithUpdatedVideoName });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const sectionsWithUpdatedVideoUrl = getUpdatedSectionsWithAddedVideoInfoNewCoursesTab(this.state.sections, sectionId, 'videoUrl', videoUrl);

    this.setState({ sections: sectionsWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const sectionsWithUpdatedVideoUploadProgress = getUpdatedSectionsWithAddedVideoInfoNewCoursesTab(this.state.sections, sectionId, 'uploadProgress', data.progress);

    this.setState({ sections: sectionsWithUpdatedVideoUploadProgress });
  };

  handleSuccessMessageAfterCourseCreation = () => {
    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onHandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: null });

    if (this.state.sections.every((section) => section.videoUrl !== null)) {
      try {
        const sectionsWithPositions = this.state.sections.map((section, index) => {
          return {
            ...section,
            position: index,
          };
        });

        const response = await fetch(`${API_DOMAIN}/add-course`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            sections: sectionsWithPositions,
          }),
        });

        const result = await response.json();

        if (!result.error) {
          this.setState({ ...getInitialCourseState(), successMessage: 'Successfully created new course!' });

          this.handleSuccessMessageAfterCourseCreation();
          // Makes sure getServerSideProps gets called again so we see our new course in the existing courses tab without refreshing
          this.props.refreshData();
        } else {
          this.setState({
            loading: false,
            errorMessage: 'Creating course failed. Try again.',
          });
        }
      } catch (error) {
        console.log(error);

        this.setState({
          loading: false,
          errorMessage: 'Creating course failed. Try again.',
        });
      }
    } else {
      this.setState({
        loading: false,
        errorMessage: 'Please make sure videos are uploaded for every section.',
      });
    }
  };

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const updatedSections = this.state.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          videoName: '',
          videoUrl: null,
          uploadProgress: null,
        };
      }

      return section;
    });
    this.setState({ sections: updatedSections });
  };

  render() {
    const alertVariant = this.state.errorMessage?.includes('Please') ? 'warning' : 'danger';

    return (
      <Card className="w-100 p-3 d-flex rounded-0">
        <Card.Body>
          <Navbar title="Add a New Course" />

          {this.state.errorMessage
            ? <Alert variant={alertVariant}>{this.state.errorMessage}</Alert>
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
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })} />

            <h5 className="mt-4 mb-2">Add your Course Sections</h5>
            {this.state.sections.map((section, index) => {
              return (
                <EditSection
                  key={section.id}
                  section={section}
                  index={index}
                  onChangeSection={this.onChangeSection}
                  onFileSelected={this.onFileSelected}
                  onFileUploaded={this.onFileUploaded}
                  onFileUploadProgress={this.onFileUploadProgress}
                  onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                  handleRemoveSection={this.handleRemoveSection} />
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
