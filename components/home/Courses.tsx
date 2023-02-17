import { useState } from 'react';

import { Course, LogoutErrorProps, VideoState } from '@/index';

import Video from './Video';
import CoursesList from './CoursesList';

interface Props extends LogoutErrorProps {
  courses: Course[],
}

const Courses: React.FC<Props> = ({ logoutError, courses }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoState>(null);
  // TODO: replace the above state with the below, change the Video logic for rendering Buttons
  // const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  // const [currentSectionIndex, setCurrentSectionIndex] = useState(null);

  // For buttons

  // const hasNext = ...
  // const hasPrev = ...

  const onClickSetCurrentVideo = (courseIndex: number, courseTitle: string, sectionIndex: number, videoUrl: string, sectionTitle: string) => {
    setCurrentVideo({ courseIndex, courseTitle, sectionIndex, sectionTitle, videoUrl });
  };

  return (
    // TODO: change this
    <div style={{ width: '1000px' }}>
      {currentVideo
        ? (
          <Video
            logoutError={logoutError}
            currentVideo={currentVideo}
            courses={courses}
            setCurrentVideo={setCurrentVideo} />
        )
        : (
          <CoursesList
            logoutError={logoutError}
            courses={courses}
            onClickSetCurrentVideo={onClickSetCurrentVideo} />
        )
    }
    </div>
  );
};

export default Courses;
