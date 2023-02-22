import { useState, useEffect } from "react";
import { ShipService } from "../../../services/ship.service";
import { ShipDto } from "../../../dtos/ship.dto";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "../../../components/Card/Card";
import { Loader } from "../../../components/Loader/Loader";

const ShipDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { ship: defaultShip } = state || {};

  const { shipId } = useParams<{ shipId: string }>();
  const [ship, setShip] = useState<ShipDto>(defaultShip);
  const [error, setError] = useState<string>();
  const shipService = new ShipService();

  const getShipById = async (shipId: string) => {
    try {
      setShip(await shipService.getShipById(shipId));
    } catch (error) {
      setError("Une erreur est survenue: " + error);
    }
  };

  if (!shipId) return <> {() => navigate("/")}</>;

  useEffect(() => {
    getShipById(shipId);
  }, [shipId]);

  if (!ship) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="bg-white">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 px-10">
          <Link to={`/`}>
            <button className="inline-block rounded-full border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700">
              Retour
            </button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Navire: Détails
          </h1>
        </div>
      </header>
      <main>
        {!error ? (
          <div className="flex flex-row mt-8 px-5 space-x-4">
            <div className="basis-1/4">
              <Card
                style={{ width: 350, height: 400 }}
                imageURL={ship.image}
                title={ship.name}
                titleEmoji="🛥️"
                description={`Roles: ${ship.roles.map((role) => role)}`}
                descriptionMaxLength={100}
                footer={ship.home_port}
              />
            </div>
            <div className="basis-3/4 border-gray-200 md:p-4 border-2 rounded-lg">
              <>détails ....</>
            </div>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </main>
    </div>
  );
};

export default ShipDetails;
