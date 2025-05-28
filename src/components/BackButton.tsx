import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackButtonProps {
  to: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(to)}
      variant="contained"
      color="inherit"
      startIcon={<ArrowBackIcon />}
      sx={{
        mt: 2,
        ml: 2,
        textTransform: "none",
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
