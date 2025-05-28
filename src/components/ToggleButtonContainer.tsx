import { ToggleButton, ToggleButtonGroup } from "@mui/material";
interface ToggleButtonContainerProps {
  labels: String[];
  handleToggleView: (
    _event: React.MouseEvent<HTMLElement>,
    value: "List" | "Cards"
  ) => void;
}

const ToggleButtonContainer = ({
  labels,
  handleToggleView,
}: ToggleButtonContainerProps) => {
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={handleToggleView}
        aria-label="Platform"
      >
        {labels.map((label, index) => (
          <ToggleButton value={label} key={index}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};
export default ToggleButtonContainer;
