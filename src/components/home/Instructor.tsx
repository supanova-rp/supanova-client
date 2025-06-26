import Header from "./Header";
import JoelProfilePicture from "../../assets/images/joel-profile.jpg";

const Instructor = () => {
  return (
    <div className="instructor-container">
      <Header
        className="default-header"
        headerClassname="centered-header"
        title="Meet Your Instructor"
      />
      <div className="instructor-content-container">
        <img
          src={JoelProfilePicture}
          alt="Instructor"
          className="instructor-image"
        />
        <p className="m-0 p-0">
          With over a decade’s experience in the world of radiation protection,
          Joel began his journey by earning a Ph.D. in radiochemistry,
          distinguished by publications in peer-reviewed journals, including the
          Journal of Environmental Radioactivity. Following this, he spent eight
          years working as a consultant for a leading radiation protection
          service before assuming his current role as a Radiation Protection
          Adviser at the University of Cambridge. Joel has experience providing
          radiation protection advice to most sectors and is a qualified
          Radiation Protection Adviser (RPA) and Radioactive Waste Adviser
          (RWA).
        </p>
      </div>
    </div>
  );
};

export default Instructor;
