import uuid from 'react-uuid';

export const curriculumData = [{
  courseTitle: 'Managing Stakeholders',
  id: uuid(),
  description: 'Find out about the most important actors in the hotel industry and how to manage them',
  sections: [
    {
      id: uuid(),
      title: 'Introduction',
      videoLength: '0:51',
    },
    {
      id: uuid(),
      title: 'Who are the main stakeholders?',
      videoLength: '20:03',
    },
    {
      id: uuid(),
      title: 'Primary stakeholders',
      videoLength: '10:41',
    },
    {
      id: uuid(),
      title: 'Secondary stakeholders',
      videoLength: '7:11',
    },
    {
      id: uuid(),
      title: 'Secondary stakeholders',
      videoLength: '5:19',
    },
    {
      id: uuid(),
      title: 'Who manages stakeholders?',
      videoLength: '21:41',
    },
    {
      id: uuid(),
      title: 'How to manage stakeholders?',
      videoLength: '31:49',
    },
    {
      id: uuid(),
      title: 'Wrapping up',
      videoLength: '2:29',
    },
  ],
}];
