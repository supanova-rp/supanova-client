import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import RocketLogo from "../images/Rocket-logo.png"

const PageNotFound = () => {
  return ( 
    <div className="page-not-found-container">
      <img src={RocketLogo} alt="Rocket" className="page-not-found-logo" />
      <h1>Oops!</h1>
      <p>The page you could not be found...</p>
      <Button className="main-button" type="button">
        <Link to="/">Back Home</Link>
      </Button>
    </div>
   );
}
 
export default PageNotFound;