import { useState, useEffect } from "react";
import "./Home.css";
import { ShipDto } from "../../dtos/ship.dto";
import { ShipService } from "../../services/ship.service";

const Home = () => {
  const [ships, setShips] = useState<ShipDto[]>([]);
  const shipService = new ShipService();

  const getShips = async () => {
    setShips(await shipService.getShips());
  };

  useEffect(() => {
    getShips();
  });

  return (
    <div className="Home">
      {ships.map((s) => (
        <div className="ship" key={s.id}>
          {s.name}
        </div>
      ))}
    </div>
  );
};

export default Home;
