import { Alert } from "react-bootstrap";

interface Props {
  logoutError: string,
}

const LogoutError: React.FC<Props> = ({ logoutError }) => {
  return ( 
    <>
      {logoutError
        ? <Alert variant="danger" className="logout-error">{logoutError}</Alert>
        : null
      }
    </>
   );
}
 
export default LogoutError;