import axios from "axios";
import type { RaceResponse, RacesDetails } from "../interfaces/RacesData";
import type {
  RaceResult,
  RaceResultsResponse,
} from "../interfaces/RaceDetailsData";

export const getRaces = async (
  season: string,
  offset: number,
  limit: number
): Promise<RacesDetails> => {
  const response = await axios.get<RaceResponse>(
    `https://api.jolpi.ca/ergast/f1/${season}?offset=${offset}&limit=${limit}`
  );
  return response.data.MRData;
};

export const getRaceDetails = async (
  season: string,
  round: string
): Promise<RaceResult[]> => {
  const response = await axios.get<RaceResultsResponse>(
    `https://api.jolpi.ca/ergast/f1/${season}/${round}/results/`
  );
  return response.data.MRData.RaceTable.Races[0].Results;
};
