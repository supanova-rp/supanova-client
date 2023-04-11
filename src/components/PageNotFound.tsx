import RocketLogo from "../images/Rocket-logo.png"

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <img src={RocketLogo} alt="Rocket" className="page-not-found-logo" />
      <h1>Oops!</h1>
      <p>The page you were looking for could not be found...</p>
    </div>
   );
}

export default PageNotFound;