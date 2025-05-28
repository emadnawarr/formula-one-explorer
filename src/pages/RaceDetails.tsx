import { useParams } from "react-router-dom";
import RaceDetailsContainer from "../components/RaceDetailsContainer";
import BackButton from "../components/BackButton";

const RaceDetails = () => {
  const { season, round } = useParams();

  return (
    <div>
      <BackButton to={`/${season}/races`} />
      <RaceDetailsContainer season={season} round={round} />
    </div>
  );
};

export default RaceDetails;
