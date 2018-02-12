// core 

import React from 'react';
import ReactDOM from 'react-dom';
// 1

import { ApolloProvider } from 'react-apollo';
import client from './apollo';




// 2 - Connect Application
import App from './components/App';




// 4
ReactDOM.render(
	<ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
	document.querySelector('#root')
);