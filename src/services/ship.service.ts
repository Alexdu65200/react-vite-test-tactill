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

    async getShips(): Promise<ShipDto[]> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getShips,
                })
            if (error) throw new ApolloError(error)
            return data.ships as ShipDto[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des navires`);
        }
    }
}
