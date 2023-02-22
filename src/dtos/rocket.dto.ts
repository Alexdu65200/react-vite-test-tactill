export type RocketDto = {
    __typename: string;
    id: string;
    name: string;
    description: string
    cost_per_launch: number;
    active: boolean;
    company: string;
    country: string;
    mass: {
        kg: number;
    }
    height: {
        meters: number;
    }
    diameter: {
        meters: number;
    }
    wikipedia: string;
    first_flight: string;
    engines: {
        number: number;
        type: string;
    }
};