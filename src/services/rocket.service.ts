import {
    ApolloClient,
    ApolloError,
    NormalizedCacheObject,
} from '@apollo/client'
import queriesConst from '../const/queries.const'
import { LaunchDto } from '../dtos/launch.dto'
import { RocketDto } from '../dtos/rocket.dto'
import { ApolloSingleton } from './apollo-singleton'

export class RocketService {
    client: ApolloClient<NormalizedCacheObject>

    constructor() {
        this.client = ApolloSingleton.getInstance()
    }

    async getRockets(): Promise<RocketDto[]> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getRockets,
                })
            if (error) throw new ApolloError(error)
            return data.rockets as RocketDto[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des rockets`);
        }
    }

    async getRocketById(rocketId: string): Promise<RocketDto> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getRocketById,
                    variables: { rocketId }
                })
            if (error) throw new ApolloError(error)
            return data.rocket as RocketDto;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la rocket avec l'ID ${rocketId}`);
        }
    }

    async getLaunchByRocketId(rocket_id: string): Promise<LaunchDto[]> {
        try {
            const { data, error } = await this.client
                .query({
                    query: queriesConst.getLaunchesByRocketId,
                    variables: { find: { rocket_id } }
                })
            if (error) throw new ApolloError(error)
            return data.launches as LaunchDto[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de launches avec rocket_id ${rocket_id}`);
        }
    }
}
