import { useState, useEffect } from "react";
import { ShipDto } from "../../dtos/ship.dto";
import { ShipService } from "../../services/ship.service";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import defaultShipImage from "../../assets/default-ship.jpg";
import defaultRocketImage from "../../assets/default-rocket.jpg";
import { RocketDto } from "../../dtos/rocket.dto";
import { RocketService } from "../../services/rocket.service";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [ships, setShips] = useState<ShipDto[]>([]);
  const [rockets, setRockets] = useState<RocketDto[]>([]);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const [scroll, setScroll] = useState({
    ships: { limit: 10 },
    rockets: { limit: 10 },
  });

  const [checked, setChecked] = useState({ ships: false, rockets: true });

  const shipService = new ShipService();
  const rocketService = new RocketService();

  const getRockets = async (limit: number) => {
    try {
      setRockets(await rocketService.getRockets(limit));
    } catch (error) {
      setError("Une erreur est survenue: " + error);
    }
  };

  const getShips = async (limit: number) => {
    try {
      setShips(await shipService.getShips(limit));
      setScroll({
        ships: { limit: limit + 4 },
        rockets: scroll.rockets,
      });
    } catch (error) {
      setError("Une erreur est survenue: " + error);
    }
  };

  useEffect(() => {
    checked.rockets
      ? getRockets(scroll.rockets.limit)
      : (setRockets([]),
        setScroll({
          ships: scroll.ships,
          rockets: { limit: 10 },
        }));
  }, [checked.rockets]);

  useEffect(() => {
    checked.ships
      ? getShips(scroll.rockets.limit)
      : (setShips([]),
        setScroll({
          rockets: scroll.rockets,
          ships: { limit: 10 + 4 },
        }));
  }, [checked.ships]);

  const handleScroll = () =>
    checked.ships && checked.rockets
      ? (getShips(scroll.ships.limit), getRockets(scroll.rockets.limit))
      : checked.ships
      ? getShips(scroll.ships.limit)
      : undefined;

  const mixed = [...ships, ...rockets];

  return (
    <div className="min-h-full">
      <main>
        <div className="grid grid-flow-row-dense">
          <div className="col-start-1 col-end-2 sm:col-end-3">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <fieldset>
                  <div className="flex items-center mb-4">
                    <input
                      id="checkbox-1"
                      aria-describedby="checkbox-1"
                      type="checkbox"
                      defaultChecked={checked.ships}
                      onClick={(e) =>
                        setChecked({
                          ships: e.currentTarget.checked,
                          rockets: checked.rockets,
                        })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    />
                    <label
                      htmlFor="checkbox-1"
                      className="text-sm ml-3 font-medium text-gray-900"
                    >
                      Navires
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="checkbox-2"
                      aria-describedby="checkbox-2"
                      type="checkbox"
                      defaultChecked={checked.rockets}
                      onClick={(e) =>
                        setChecked({
                          ships: checked.ships,
                          rockets: e.currentTarget.checked,
                        })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    />
                    <label
                      htmlFor="checkbox-2"
                      className="text-sm ml-3 font-medium text-gray-900"
                    >
                      Rockets
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="col-start-2 col-end-7 sm:col-start-3">
            {error ? (
              <>{error}</>
            ) : mixed.length > 0 ? (
              <InfiniteScroll
                dataLength={mixed.length}
                next={handleScroll}
                hasMore={true} //puisque l'objet ne retourne pas le total, on change à l'infini
                loader={<></>}
                scrollableTarget="scrollableDiv"
              >
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols gap-2 mx-4">
                  {mixed.map((s) =>
                    "description" in s && s.__typename == "Rocket" ? (
                      <Card
                        key={s.id}
                        style={{ width: "100%", height: 400 }}
                        className="m-2"
                        imageURL={defaultRocketImage}
                        title={s.name}
                        titleEmoji="🚀"
                        description={s.description}
                        descriptionMaxLength={100}
                        handleClick={() => navigate(`/rockets/${s.id}`)}
                        badge={s.company}
                      />
                    ) : "image" in s && s.__typename == "Ship" ? (
                      <Card
                        key={s.id}
                        style={{ width: "100%", height: 400 }}
                        className="m-2"
                        imageURL={s.image ? s.image : defaultShipImage} // Dans certains cas où l'image est undefined je défini une image par default}
                        title={s.name}
                        titleEmoji="🛥️"
                        description={`Roles: ${s.roles.map((role) => role)}`}
                        descriptionMaxLength={100}
                        handleClick={
                          () =>
                            navigate(`/ships/${s.id}`, { state: { ship: s } }) //Je passe l'état dans les paramètres car getShipMyId ne renvoie pas tous les champs (undefined))
                        }
                        badge={s.home_port}
                      />
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="flex items-center flex-wrap mb-20 mt-5">
                <div className="w-full pl-10">
                  <h4 className="text-3xl text-gray-800 font-bold mb-3">
                    🔥 Bienvenue
                  </h4>
                  <p className="text-gray-600 mb-8">
                    Veuillez sélectionner une entité pour commencer.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
