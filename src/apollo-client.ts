import {ApolloClient, HttpLink, InMemoryCache, split,} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {createClient} from 'graphql-ws';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/query',
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:8080/query', // Replace with your actual GraphQL WebSocket endpoint
}));

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;
