import { useState, useEffect } from "react";
import "./App.css";
import { ShipDto } from "./dtos/ship.dto";
import { getShips } from "./services/graphql";
import { ShipService } from "./services/ship.service";

const App = () => {
  const [ships, setShips] = useState<ShipDto[]>([]);
  const shipService = new ShipService();

  const getShips = async () => {
    setShips(await shipService.getShips());
  };

  useEffect(() => {
    getShips();
  });

  return (
    <div className="App">
      {ships.map((s) => (
        <div className="ship" key={s.id}>
          {s.name}
        </div>
      ))}
    </div>
  );
};

export default App;
