export interface RaceResultsResponse {
  MRData: {
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      round: string;
      Races: Race[];
    };
  };
}

export interface Race {
  round: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  Results: RaceResult[];
}

export interface Circuit {
  circuitName: string;
}

export interface RaceResult {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Time?: {
    millis: string;
    time: string;
  };
}

export interface Driver {
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  name: string;
  nationality: string;
}
