import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Race } from "../interfaces/RacesData";
import { getRaces } from "../services/racesService";
import { Pagination } from "@mui/material";
import ToggleButtonContainer from "./ToggleButtonContainer";
import CardsListView from "./CardsListView";
import ListView from "./ListView";
import Card from "./Card";
import ListItem from "./ListItem";
import NProgress from "nprogress";
import { formatDate } from "../utils/reusableFunctions";

interface RacesContainerProps {
  season: string | undefined;
}

const RacesContainer = ({ season }: RacesContainerProps) => {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);
  const racesLimit = 16;
  const totalRaces = useRef(0);
  const views = ["List", "Cards"];
  const [error, setError] = useState("");
  const [races, setRaces] = useState<Race[]>([]);
  const [pinnedRaces, setPinnedRaces] = useState<Race[]>([]);
  const [isCardView, setIsCardView] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRaces();
  }, [offset]);

  useEffect(() => {
    const pinned = localStorage.getItem("pinnedRaces");
    if (pinned) {
      setPinnedRaces(JSON.parse(pinned));
    }
  }, []);

  const fetchRaces = async () => {
    NProgress.start();

    try {
      if (!season) throw error;
      const racesResult = await getRaces(season, offset, racesLimit);
      setRaces(racesResult.RaceTable.Races);
      if (totalRaces.current === 0) {
        totalRaces.current = Number(racesResult.total);
      }
    } catch (err) {
      const message = "Failed to fetch Races!";
      setError(message);
    } finally {
      NProgress.done();
    }
  };

  const handlePinToggle = (race: Race) => {
    const alreadyPinned = pinnedRaces.find((r) => r.raceName === race.raceName);
    const updatedPins = alreadyPinned
      ? pinnedRaces.filter((r) => r.raceName !== race.raceName)
      : [...pinnedRaces, race];

    setPinnedRaces(updatedPins);
    localStorage.setItem("pinnedRaces", JSON.stringify(updatedPins));
  };

  const handleToggleView = (
    _event: React.MouseEvent<HTMLElement>,
    value: "List" | "Cards"
  ) => {
    if (value === "List") {
      setIsCardView(false);
    } else {
      setIsCardView(true);
    }
  };
  const renderRacesCardItem = (race: Race) => (
    <Card
      handleClick={() => handleRaceClicked(race)}
      isPinned={isRacePinned(race)}
      onPinToggle={() => handlePinToggle(race)}
    >
      <h3>{race.raceName}</h3>
      <h5>{race.Circuit.circuitName}</h5>
      <p>{formatDate(race.date)}</p>
    </Card>
  );
  const renderRacesListItem = (race: Race) => (
    <ListItem
      handleClick={() => handleRaceClicked(race)}
      isPinned={isRacePinned(race)}
      onPinToggle={() => handlePinToggle(race)}
    >
      <h3>{race.raceName}</h3>
      <h5>{race.Circuit.circuitName}</h5>
      <p>{formatDate(race.date)}</p>
    </ListItem>
  );

  const isRacePinned = (race: Race) =>
    pinnedRaces.some((r) => r.raceName === race.raceName);

  const displayRaces = () => {
    const sortedRaces = [
      ...pinnedRaces,
      ...races.filter((r) => !isRacePinned(r)),
    ];

    return isCardView ? (
      <CardsListView items={sortedRaces} renderCard={renderRacesCardItem} />
    ) : (
      <ListView items={sortedRaces} renderListItem={renderRacesListItem} />
    );
  };

  const racesPageCount = () => {
    return races.length > 0 ? Math.ceil(totalRaces.current / racesLimit) : 0;
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOffset(racesLimit * (value - 1));
  };

  const handleRaceClicked = (race: Race) => {
    navigate(`/${season}/${race.round}/results`);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>{season} Races</h1>
          <p>Total: {totalRaces.current}</p>
        </div>
        <div className="toggle-container">
          <ToggleButtonContainer
            labels={views}
            handleToggleView={handleToggleView}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {displayRaces()}
      <div className="pagination">
        <Pagination
          count={racesPageCount()}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default RacesContainer;
