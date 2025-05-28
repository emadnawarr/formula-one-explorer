import axios from "axios";
import type {
  F1SeasonsResponse,
  SeasonDetails,
} from "../interfaces/SeasonsData";

export const getSeasons = async (): Promise<SeasonDetails[]> => {
  const MAX_SEASONS = 100;
  const response = await axios.get<F1SeasonsResponse>(
    `https://api.jolpi.ca/ergast/f1/seasons?limit=${MAX_SEASONS}`
  );
  return response.data.MRData.SeasonTable.Seasons;
};
