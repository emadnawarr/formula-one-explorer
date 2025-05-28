export interface SeasonDetails {
  season: string;
}

export interface SeasonTable {
  Seasons: SeasonDetails[];
}

export interface SeasonsResponse {
  series: string;
  limit: string;
  offset: string;
  total: string;
  SeasonTable: SeasonTable;
}

export interface F1SeasonsResponse {
  MRData: SeasonsResponse;
}
