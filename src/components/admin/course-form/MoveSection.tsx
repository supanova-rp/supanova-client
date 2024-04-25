import React from "react";
import { Button } from "react-bootstrap";
import { MoveSectionFn } from "./utils";

interface Props {
  sectionId: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveSection: MoveSectionFn
}

const MoveSection: React.FC<Props> = ({
  sectionId,
  isFirst,
  isLast,
  onMoveSection
}) => {
  if (isFirst && isLast) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 5, paddingBottom: 24 }}>
      {isFirst
        ? null
        : (
          <Button
            onClick={() => onMoveSection(sectionId, "up")}
            type="button"
            disabled={isFirst}
            className="main-button">
            Move Section Up
          </Button>
        )
      }

      {isLast
        ? null
        : (
          <Button
            onClick={() => onMoveSection(sectionId, "down")}
            type="button"
            disabled={isLast}
            className="main-button">
            Move Section Down
          </Button>
        )
      }
    </div>
  );
};

export default MoveSection;
