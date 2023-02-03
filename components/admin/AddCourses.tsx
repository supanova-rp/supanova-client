/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import FilePicker from '@/components/admin/FilePicker';

import Navbar from './Navbar';
import RemoveUserInput from './RemoveUser';
import FormGroup from './FormGroup';
import AddMoreInputs from './AddMoreInputs';

const AddCourses = () => {
  const [titleInput, setTitleInput] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [chapters, setChapters] = useState([{ id: 0, title: '' }]);

  const onChangeChapter = (index: number, e) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === index) {
        return {
          ...chapter,
          title: e.target.value,
        };
      }

      return chapter;
    });

    setChapters(updatedChapters);
  };

  const onClickAddNewChapter = () => {
    const updatedChapters = [
      ...chapters,
      {
        id: chapters.length,
        title: '',
      },
    ];

    setChapters(updatedChapters);
  };

  const onClickRemoveChapter = (chapterId: number) => {
    const updatedChapters = chapters.filter((chapter) => chapterId !== chapter.id);

    setChapters(updatedChapters);
  };

  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Add New Courses" />
        <Form>
          <FormGroup 
          formId="title"
          className="mb-2"
          label="Course Title"
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)} />
          <FormGroup
            formId="description"
            className="mb-2"
            label="Course Description"
            type="text"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}/>
       
          <h5 className="mt-4 mb-2">Add your Course Chapters</h5>
          {chapters.map((chapter, index) => {
            return (
              <div className="d-flex align-items-center" key={`chapter-${index}`}>
                <div>
                  <FormGroup 
                  formId="course-chapter"
                  className="my-4"
                  label="Chapter Title"
                  type="text"
                  value={chapter.title}
                  onChange={(e) => onChangeChapter(index, e)}
                  Component={<FilePicker />} />
                </div>
                <div>

                  {chapter.id !== 0
                    ? <RemoveUserInput onClickFunction={() => onClickRemoveChapter(chapter.id)} />
                    : null
                  }

                </div>
              </div>
            );
          })}

          <AddMoreInputs title="Add another chapter" onClick={onClickAddNewChapter} />
        </Form>
        <Button type="submit" className="w-30">Submit</Button>
      </Card.Body>
    </Card>
  );
};

export default AddCourses;
