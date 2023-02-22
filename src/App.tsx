import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RocketDetails from "./pages/rockets/[rocketId]";
import ShipDetails from "./pages/ships/[shipId]";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ships/:shipId" element={<ShipDetails />} />
        <Route path="rockets/:rocketId" element={<RocketDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
