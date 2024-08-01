import { PropsWithChildren } from "react";

const PageContentContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="course-content-container"
      style={{ boxShadow: "inset 1px 0px 5px 0px hsl(228deg 66% 45% / 15%)" }}
    >
      {children}
    </div>
  );
};

export default PageContentContainer;
