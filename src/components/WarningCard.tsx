import { ReactComponent as NotAvailableIcon } from "../icons/notAvailableIcon.svg";

interface Props {
  warningMessage: string,
}

const WarningCard: React.FC<Props> = ({ warningMessage }) => {
  return (
    <div className="feedback-card-container">
      <div className="feedback-card-content">
        <NotAvailableIcon
          className="feedback-icon"/>
        <h3 className="warning-title">Uh oh!</h3>
        <p className="feedback-description">{warningMessage}</p>
      </div>
    </div>

  );
};

export default WarningCard;