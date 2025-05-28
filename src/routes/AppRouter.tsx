import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Races from "../pages/Races";
import RaceDetails from "../pages/RaceDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:season/races" element={<Races />} />
        <Route path="/:season/:round/results" element={<RaceDetails />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
