import {
    ApolloClient,
    ApolloError,
    gql,
    NormalizedCacheObject,
} from '@apollo/client'
import queriesConst from '../const/queries.const'
import { ShipDto } from '../dtos/ship.dto'
import { ApolloSingleton } from './apollo-singleton'

export class ShipService {
    client: ApolloClient<NormalizedCacheObject>

    constructor() {
        this.client = ApolloSingleton.getInstance()
    }

    async getShips(limit?: number): Promise<ShipDto[]> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getShips,
                    variables: { limit }
                })
            if (error) throw new ApolloError(error)
            return data.ships as ShipDto[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des navires`);
        }
    }

    async getShipById(shipId: string): Promise<ShipDto> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getShipById,
                    variables: { id: shipId }
                })
            if (error) throw new ApolloError(error)
            return data.ship as ShipDto;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du navire avec l'ID ${shipId}`);
        }
    }

}
