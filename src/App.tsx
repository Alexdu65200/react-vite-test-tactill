import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShipDetails from "./pages/Ships/[shipId]";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ships/:shipId" element={<ShipDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
