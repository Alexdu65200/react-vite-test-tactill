import { useState, useEffect } from "react";
import { ShipDto } from "../../dtos/ship.dto";
import { ShipService } from "../../services/ship.service";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import defaultShipImage from "../../assets/default-ship.jpg";

const Home = () => {
  const [ships, setShips] = useState<ShipDto[]>([]);
  const navigate = useNavigate();
  const shipService = new ShipService();

  const getShips = async () => {
    setShips(await shipService.getShips());
  };

  useEffect(() => {
    getShips();
  });

  if (!ships) return <Loader />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {ships.map((s) => (
        <Card
          key={s.id}
          style={{ width: "100%", height: 400 }}
          className="m-2"
          imageURL={s.image ? s.image : defaultShipImage} // Dans certains cas où l'image est undefined je défini une image par default}
          title={s.name}
          titleEmoji="🛥️"
          description={`Roles: ${s.roles.map((role) => role)}`}
          descriptionMaxLength={100}
          handleClick={() => navigate(`/ships/${s.id}`)}
          badge={s.home_port}
        />
      ))}
    </div>
  );
};

export default Home;
