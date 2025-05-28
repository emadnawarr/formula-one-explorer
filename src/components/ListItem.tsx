import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  handleClick?: () => void;
  isPinned?: boolean;
  onPinToggle?: () => void;
}

const ListItem = ({
  children,
  handleClick,
  isPinned,
  onPinToggle,
  ...props
}: ListItemProps) => {
  return (
    <div
      onClick={handleClick}
      className={`list-item ${isPinned ? "pinned" : ""}`}
      {...props}
    >
      {onPinToggle && (
        <div
          className="pin-icon"
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle();
          }}
        >
          {isPinned ? <CloseIcon /> : <PushPinIcon />}
        </div>
      )}
      {children}
    </div>
  );
};

export default ListItem;
