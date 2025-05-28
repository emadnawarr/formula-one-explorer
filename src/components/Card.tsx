import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";

interface CardProps {
  children: React.ReactNode;
  handleClick: () => void;
  isPinned?: boolean;
  onPinToggle?: () => void;
}

const Card = ({ children, handleClick, isPinned, onPinToggle }: CardProps) => {
  return (
    <div onClick={handleClick} className={`card ${isPinned ? "pinned" : ""}`}>
      {onPinToggle && (
        <div
          className="pin-icon"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle();
          }}
        >
          {isPinned ? (
            <CloseIcon data-testid="CloseIcon" />
          ) : (
            <PushPinIcon data-testid="PushPinIcon" />
          )}
        </div>
      )}
      {children}
    </div>
  );
};
export default Card;
