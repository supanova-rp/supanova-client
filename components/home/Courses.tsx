import { useState } from 'react';

import { LogoutErrorProps } from '@/index';

import Video from './Video';
import CoursesList from './CoursesList';

const Courses: React.FC<LogoutErrorProps> = ({ logoutError }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      {showVideo
        ? <Video logoutError={logoutError} setShowVideo={setShowVideo} />
        : <CoursesList logoutError={logoutError} setShowVideo={setShowVideo} />
    }
    </div>
  );
};

export default Courses;
