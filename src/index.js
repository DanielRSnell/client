// core 

import React from 'react';
import ReactDOM from 'react-dom';
// 1

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// 2
import App from './components/App';

// 3 
const client = new ApolloClient({
	link: createHttpLink({ uri: 'https://graph-hackcoin.now.sh/graphql' }),
	cache: new InMemoryCache(),
	dataIdFromObject: o => o.id
});



// 4
ReactDOM.render(
	<ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
	document.querySelector('#root')
);