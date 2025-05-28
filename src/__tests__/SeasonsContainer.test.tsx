import { render, screen, waitFor } from "@testing-library/react";
import SeasonsContainer from "../components/SeasonsContainer";
import * as seasonService from "../services/seasonService";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock the API
vi.mock("../services/seasonService");

const mockedSeasons = [
  {
    season: "2023",
    url: "https://en.wikipedia.org/wiki/2023_Formula_One_World_Championship",
  },
  {
    season: "2022",
    url: "https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship",
  },
];

describe("SeasonsContainer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders seasons after fetch", async () => {
    (seasonService.getSeasons as any).mockResolvedValueOnce(mockedSeasons);

    render(
      <BrowserRouter>
        <SeasonsContainer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Formula 1 Seasons/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("2023")).toBeInTheDocument();
      expect(screen.getByText("2022")).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    (seasonService.getSeasons as any).mockRejectedValueOnce(new Error("fail"));

    render(
      <BrowserRouter>
        <SeasonsContainer />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch seasons!")).toBeInTheDocument();
    });
  });
});
