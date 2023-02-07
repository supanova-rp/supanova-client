import { LogoutErrorProps } from "@/index";
import { Alert } from "react-bootstrap";

const LogoutError: React.FC<LogoutErrorProps> = ({ logoutError }) => {
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