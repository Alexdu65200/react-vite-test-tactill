import { RocketDto } from "../../dtos/rocket.dto";

interface Props {
  rocket: RocketDto;
}

const RocketDetailsTab = ({ rocket }: Props) => {
  return (
    <>
      <div className="p-4 border-gray-200 border-2 rounded-lg">
        <ul className="list-none grid grid-cols-2 gap-2">
          <li className="w-full p-4">
            <span>💰 Coût par lancements</span>:{" "}
            {rocket.cost_per_launch ? `${rocket.cost_per_launch} $` : "N/A"}
          </li>
          <li className="w-full p-4">
            <span>⚖️ Masse</span>:{" "}
            {rocket.mass.kg ? `${rocket.mass.kg} kg` : "N/A"}
          </li>

          <li className="w-full p-4">
            <span>🏴󠁥󠁳󠁰󠁶󠁿 Pays</span>: {rocket.country ? rocket.country : "N/A"}
          </li>

          <li className="w-full p-4">
            <span>📏 Longueur</span>:{" "}
            {rocket.height.meters ? `${rocket.height.meters} mètres` : "N/A"}
          </li>
          <li className="w-full p-4">
            <span>↔️ Diamètre</span>:{" "}
            {rocket.diameter.meters
              ? `${rocket.diameter.meters} mètres`
              : "N/A"}
          </li>
          <li className="w-full p-4">
            <span>📅 Date du 1er vol</span>:{" "}
            {rocket.first_flight
              ? new Date(rocket.first_flight).toLocaleDateString("fr-FR")
              : "N/A"}
          </li>
        </ul>
      </div>
    </>
  );
};

export default RocketDetailsTab;
