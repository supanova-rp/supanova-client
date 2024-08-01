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
          Joel Garner founded Supanova in 2025 with a clear vision: to deliver
          friendly, personalised, and professional radiation protection services
          to all sectors. With over a decade’s experience in the field, Joel
          began his journey by earning a Ph.D. in radiochemistry, distinguished
          by publications in peer-reviewed journals, including the Journal of
          Environmental Radioactivity. Following this, he spent eight years
          working as a consultant for a leading radiation protection service
          before assuming his current role as Radiation Protection Officer at
          the University of Cambridge. Joel is a qualified Radiation Protection
          Adviser (RPA) and Radioactive Waste Adviser (RWA), alongside being a
          Chartered Radiation Protection Professional (CRadP).
        </p>
      </div>
    </div>
  );
};

export default Instructor;
