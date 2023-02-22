import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";


export class ApolloSingleton {
    private static instance: ApolloClient<NormalizedCacheObject>;


    public static getInstance(): ApolloClient<NormalizedCacheObject> {
        if (!ApolloSingleton.instance) {
            ApolloSingleton.instance = new ApolloClient({
                uri: 'https://spacex-production.up.railway.app/',
                cache: new InMemoryCache(),
            });
        }

        return ApolloSingleton.instance;
    }

}

