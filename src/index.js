import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Apps from './Router';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from 'react-apollo-hooks'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {BrowserRouter} from 'react-router-dom'
import {ApolloClient} from 'apollo-client'
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const cache = new InMemoryCache()
const WsClient = new SubscriptionClient(process.env.REACT_APP_API_GRAPHQL_WS,{
    reconnect:true
})
const httpLink = new HttpLink({uri: process.env.REACT_APP_API_GRAPHQL})
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        console.log({ query: query, kind: kind, operation: operation });
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    WsClient,
    httpLink)
const client = new ApolloClient({link, cache});

const App = () => (
    <ApolloProvider client={client}> 
        <BrowserRouter>
            <Apps/>
        </BrowserRouter> 
    </ApolloProvider>
)

ReactDOM.render(<App/ >, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls. Learn
    // more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();
