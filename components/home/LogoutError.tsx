import React from 'react';

import { LogoutErrorProps } from '@/index';
import { Alert } from 'react-bootstrap';

const LogoutError: React.FC<LogoutErrorProps> = ({ logoutError }) => {
  if (logoutError) {
    return (
      <Alert variant="danger" className="logout-error">{logoutError}</Alert>
    );
  }

  return null;
};

export default LogoutError;
