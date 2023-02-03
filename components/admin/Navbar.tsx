import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  title: string,
}

const Navbar: React.FC<Props> = ({ title }) => {
  return ( 
    <div className="d-flex justify-content-md-between mb-4 align-items-center">
      <h2 className="mb-0">{title}</h2>
      <Button variant="link"><Link href="/home">Back Home</Link></Button>
    </div>
   );
}
 
export default Navbar ;