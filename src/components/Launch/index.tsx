import { LaunchDto } from "../../dtos/launch.dto";

interface Props {
  launches: LaunchDto[];
}

const LaunchCard = ({ launches }: Props) => {
  return (
    <div className="max-w max-h-96 p-4 border-gray-200 md:p-6 overflow-auto border-2 rounded-lg">
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Détails</th>
              <th>Date de lancement</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.mission_name}</td>
                <td>{launch.details ? launch.details : "N/A"}</td>
                <td>
                  {new Date(launch.launch_date_utc).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaunchCard;
