import RocketLogo from "../images/rocket-logo.png";

interface Props {
  title: string,
  text: string,
}

const PageErrorScreen: React.FC<Props> = ({ title, text }) => {
  return (
    <div className="page-not-found-container">
      <img
        src={RocketLogo}
        alt="Rocket"
        className="page-not-found-logo" />
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default PageErrorScreen;