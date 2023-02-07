import { Button } from 'react-bootstrap';

import { colors } from '@/constants/colorPalette';
import ChevronLeft from '@/icons/chevronLeft.svg';

import { LogoutErrorProps } from '@/index';
import Header from './Header';

interface Props extends LogoutErrorProps {
  setShowVideo: (parameter: boolean) => void;
}

const Video: React.FC<Props> = ({ logoutError, setShowVideo }) => {
  return ( 
    <>
      <div>
        <div className="d-flex align-items-center">
          <div className="p-1 clickable chevron-left">
            <ChevronLeft stroke={colors.orange} className="mt-3 me-1" onClick={() => setShowVideo(false)}/>
          </div>
          <Header title="1. Managing Stakholders" logoutError={logoutError} />
        </div>
        <h5 className="my-4">1. Introduction</h5>
        <video
      id="my-player"
      className="video-js"
      controls
      preload="auto"
      poster="//vjs.zencdn.net/v/oceans.png"
      data-setup='{}'>
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div>
        <Button>Next Video</Button>
      </div>
    </>
   );
}
 
export default Video;