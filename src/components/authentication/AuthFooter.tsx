import { Link } from "react-router-dom";

interface AuthFooterProps {
  footerText: string;
  footerLinkText: string;
  footerLinkPath: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  footerText,
  footerLinkPath,
  footerLinkText,
}) => {
  return (
    <footer className="footer-container">
      <p className="auth-paragraph p-0 mb-0 me-1">{footerText}</p>
      <Link to={footerLinkPath} className="auth-link">
        {footerLinkText}
      </Link>
    </footer>
  );
};

export default AuthFooter;
