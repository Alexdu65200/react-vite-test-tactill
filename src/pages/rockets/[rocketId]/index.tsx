import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";
import { RocketService } from "../../../services/rocket.service";
import { RocketDto } from "../../../dtos/rocket.dto";
import Card from "../../../components/Card/Card";
import defaultRocketImage from "../../../assets/default-rocket.jpg";

const RocketDetails = () => {
  const navigate = useNavigate();

  const { rocketId } = useParams<{ rocketId: string }>();
  const [rocket, setRocket] = useState<RocketDto>();
  const [error, setError] = useState<string>();
  const rocketService = new RocketService();

  const getRocketById = async (rocketId: string) => {
    try {
      setRocket(await rocketService.getRocketById(rocketId));
    } catch (error) {
      setError("Une erreur est survenue: " + error);
    }
  };

  if (!rocketId) return <> {() => navigate("/")}</>;

  useEffect(() => {
    getRocketById(rocketId);
  }, [rocketId]);

  if (!rocket) return <Loader />;

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
            Rocket: Détails
          </h1>
        </div>
      </header>
      <main>
        {!error ? (
          <div className="flex flex-row mt-8 px-5 space-x-5">
            <div className="basis-1/4">
              <Card
                style={{ width: 350, height: 400 }}
                imageURL={defaultRocketImage}
                title={rocket.name}
                titleEmoji="🚀"
                description={rocket.description}
                descriptionMaxLength={100}
                badge={rocket.company}
              />
            </div>
            <div className="basis-3/4">
              <>rocket details ....</>
            </div>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </main>
    </div>
  );
};

export default RocketDetails;
