import { useNavigate } from "react-router-dom";
import { getSeasons } from "../services/seasonService";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { SeasonDetails } from "../interfaces/SeasonsData";
import Card from "./Card";
import CardsListView from "./CardsListView";
import ListItem from "./ListItem";
import ListView from "./ListView";
import Pagination from "@mui/material/Pagination";
import ToggleButtonContainer from "./ToggleButtonContainer";
import NProgress from "nprogress";

const SeasonsContainer = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [seasons, setSeasons] = useState<SeasonDetails[]>([]);
  const [error, setError] = useState("");
  const totalSeasons = useRef(0);
  const seasonsLimit = 16;
  const views = ["List", "Cards"];
  const [isCardView, setIsCardView] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSeasons();
  }, [offset]);

  const fetchSeasons = async () => {
    NProgress.start();

    try {
      const seasonsResult = await getSeasons();
      seasonsResult.reverse();
      setSeasons(seasonsResult);
      if (totalSeasons.current === 0) {
        totalSeasons.current = Number(seasonsResult.length);
      }
    } catch (err) {
      const message = "Failed to fetch seasons!";
      setError(message);
    } finally {
      NProgress.done();
    }
  };
  const renderSeasonsCardItem = (season: SeasonDetails) => (
    <Card handleClick={() => handleSeasonClicked(season)}>
      <h3>{season.season}</h3>
    </Card>
  );
  const renderSeasonsListItem = (season: SeasonDetails) => (
    <ListItem handleClick={() => handleSeasonClicked(season)}>
      <h3>{season.season}</h3>
    </ListItem>
  );

  const displaySeasons = () => {
    const paginated = seasons.slice(offset, offset + seasonsLimit);

    return isCardView ? (
      <CardsListView items={paginated} renderCard={renderSeasonsCardItem} />
    ) : (
      <ListView items={paginated} renderListItem={renderSeasonsListItem} />
    );
  };

  const seasonsPageCount = () => {
    return seasons.length > 0
      ? Math.ceil(totalSeasons.current / seasonsLimit)
      : 0;
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOffset(seasonsLimit * (value - 1));
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

  const handleSeasonClicked = (season: SeasonDetails) => {
    localStorage.removeItem("pinnedRaces");
    navigate(`/${season.season}/races`);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Formula 1 Seasons</h1>
          <p>Total: {totalSeasons.current}</p>
        </div>
        <div className="toggle-container">
          <ToggleButtonContainer
            labels={views}
            handleToggleView={handleToggleView}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {displaySeasons()}
      <div className="pagination">
        <Pagination
          count={seasonsPageCount()}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default SeasonsContainer;
