/* eslint-disable max-len */
import Header from "./Header";

import JoelProfilePicture from "../../images/Joel-Profile.png";

const Instructor = () => {
  return (
    <div className="instructor-container">
      <Header
        title="Meet Your Instructor" />
      <div className="instructor-content-container">
        <img
          src={JoelProfilePicture}
          alt="Instructor"
          className="instructor-image" />
        <p className="m-0 p-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. </p>
      </div>
    </div>
  );
};

export default Instructor;
