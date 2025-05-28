import { useParams } from "react-router-dom";
import RacesContainer from "../components/RacesContainer";
import BackButton from "../components/BackButton";

const Races = () => {
  const { season } = useParams();

  return (
    <div>
      <BackButton to={`/`} />
      <RacesContainer season={season} />
    </div>
  );
};

export default Races;
