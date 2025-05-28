import { useEffect, useState } from "react";
import { getRaceDetails } from "../services/racesService";
import NProgress from "nprogress";
import type { RaceResult } from "../interfaces/RaceDetailsData";
import ListItem from "./ListItem";
import ListView from "./ListView";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface RaceDetailsContainerProps {
  season: string | undefined;
  round: string | undefined;
}

const RaceDetailsContainer = ({ season, round }: RaceDetailsContainerProps) => {
  const [results, setResults] = useState<RaceResult[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchRaceDetails();
  }, [season, round]);

  const fetchRaceDetails = async () => {
    NProgress.start();
    try {
      if (!season || !round) throw new Error("Missing season or round.");
      const fetchedResults = await getRaceDetails(season, round);
      setResults(fetchedResults);
    } catch (error) {
      const message = "Failed to fetch Race Results!";
      setError(message);
    } finally {
      NProgress.done();
    }
  };

  const renderStandingsListItem = (result: RaceResult) => (
    <ListItem style={{ display: "flex", alignItems: "center" }}>
      <div className="driver-position">#{result.position}</div>
      <div className="driver-details">
        <h3>
          {result.Driver.givenName} {result.Driver.familyName}
        </h3>
        <h5>{result.Driver.nationality}</h5>
        <p>{result.Constructor.name}</p>
      </div>
    </ListItem>
  );

  const chartData = results
    .filter((result) => result.Time?.millis)
    .map((result) => {
      const millis = parseInt(result.Time!.millis);
      return {
        name: `${result.Driver.givenName} ${result.Driver.familyName}`,
        millis,
        label: `${(millis / 1000).toFixed(1)}s`,
      };
    })
    .sort((a, b) => a.millis - b.millis);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>{season} Result</h1>
          <p>Round: {round}</p>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 80 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${(value / 1000).toFixed(2)} s`}
            />
            <Bar dataKey="millis" fill="#8884d8">
              <LabelList dataKey="label" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ListView items={results} renderListItem={renderStandingsListItem} />
    </div>
  );
};
export default RaceDetailsContainer;
