export type ShipDto = {
    __typename: string;
    id: string;
    name: string
    type: string
    image: string;
    roles: string[];
    home_port: string;
    position: {
        latitude: number
        longitude: number
    }
}
