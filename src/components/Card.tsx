import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className: string;
}

const Card: React.FC<Props> = ({ children, className = "" }) => {
  return <div className={`content-card ${className}`}>{children}</div>;
};

export default Card;
