/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import PlusIcon from '@/icons/plusIcon.svg';
import MinusIcon from '@/icons/minusIcon.svg'

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

  const onClickAddANewChapter = () => {
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
    <Card className="w-100 p-3 d-flex" style={{ minHeight: '100%' }}>
      <Card.Body>
        <div className="d-flex justify-content-md-between">
          <h2>Add a New Course</h2>
          <Button variant="link"><Link href="/home">Back Home</Link></Button>
        </div>
        <Form>
          <Form.Group id="title" className="mb-2">
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)} />
          </Form.Group>
          <Form.Group id="description" className="mb-2">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              type="text"
              required
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)} />
          </Form.Group>
          <h5 className="my-4">Add your Course Chapters</h5>
          {chapters.map((chapter, index) => {
            return (
              <div className="d-flex align-items-center" key={`chapter-${index}`}>
                <div>
                  <Form.Group
                    id="course-chapter"
                    className="my-4">
                    <Form.Label>Chapter Title</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={chapter.title}
                      onChange={(e) => onChangeChapter(index, e)} />
                    <p className="mt-2"><strong>Upload your video</strong></p>
                  </Form.Group>
                </div>
                <div>
                  {chapter.id !== 0
                    ? (
                      <div style={{ padding: '5px' }} onClick={() => onClickRemoveChapter(chapter.id)}>
                        <MinusIcon style={{ marginLeft: '15px', cursor: 'pointer' }} />
                      </div>
                    )
                    : null}
                </div>
              </div>
            );
          })}

          <div className="mb-4 d-flex align-items-center" onClick={onClickAddANewChapter}>
            <p className="m-0">Add another chapter</p>
            <PlusIcon style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </div>
        </Form>
        <Button type="submit" className="w-30">Submit</Button>
      </Card.Body>
    </Card>
  );
};

export default AddCourses;
