import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { ShipDto } from "../../dtos/ship.dto";
import { Loader } from "../Loader/Loader";

interface Props {
  ship: ShipDto;
}

const defaultCoordinates = [
  { name: "Marseille", latitude: 43.302615, longitude: 5.361187 },
  { name: "Monaco", latitude: 43.738419, longitude: 7.424616 },
  { name: "Londres", latitude: 51.507351, longitude: -0.127758 },
  { name: "New York", latitude: 40.712776, longitude: -74.005974 },
  { name: "Bordeaux", latitude: 44.837788, longitude: -0.57918 },
];

export const MapContainer = ({ ship }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const mapStyles = {
    width: "100%",
    height: "330px",
  };

  // On choisi une coordinate au hasard au cas où la position soit undefined
  // (l'api ne return en fait jamais la position et je ne m'en suis aperçu qu'après coup)
  const randomIndex = Math.floor(Math.random() * defaultCoordinates.length);
  const randomLocation = defaultCoordinates[randomIndex];

  const position = {
    lat: ship?.position?.latitude
      ? ship?.position?.latitude
      : randomLocation.latitude,
    lng: ship?.position?.longitude
      ? ship?.position?.longitude
      : randomLocation.longitude,
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapStyles} center={position} zoom={10}>
      <MarkerF position={position} />
    </GoogleMap>
  ) : (
    <Loader />
  );
};
