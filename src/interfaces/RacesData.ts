export interface RaceResponse {
  MRData: RacesDetails;
}

export interface RacesDetails {
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}

export interface RaceTable {
  season: string;
  Races: Race[];
}

export interface Race {
  season: string;
  round: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
}

export interface Circuit {
  circuitName: string;
}

export interface Session {
  date: string;
  time: string;
}
