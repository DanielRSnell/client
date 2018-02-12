import { ApolloClient } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Create Simple API Interface
const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazynkxt0xkj01926xxwnp9m' });

// Middleware 

const middlewareLink = setContext(() => ({
	headers: {
		'x-token': localStorage.getItem('token'),
		'x-refresh-token': localStorage.getItem('refreshToken'),
	}
}));

// Afterware 

const afterwareLink = new ApolloLink((operation, forward) => {

		const { headers } = operation.getContext();

		if (headers) {
		const token = headers.get('x-token');
		const refreshToken = headers.get('x-refresh-token');

		if ( token ) {
			localStorage.setItem('token', token);
		}

		if (refreshToken) {
			localStorage.setItem('refreshToken', refreshToken);
		}	
	}
	return forward(operation);
});

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

// Network Interface
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	dataIdFromObject: o => o.id
})

// Websocket Connection 

const wsLink= new WebSocketLink({
    uri: 'wss://subscriptions.us-west-2.graph.cool/v1/cjazynkxt0xkj01926xxwnp9m',
    options: {
    reconnect: true,
    },
});

// Split Links 

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLinkWithMiddleware
);

export default new ApolloClient({
    link,
    cache: new InMemoryCache(),
});