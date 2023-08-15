import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import merge from 'deepmerge';

let apolloClient;

// Authentication Link
const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

// Error Link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const schema = require('./schema');
    return new SchemaLink({ schema });
  } else {
    return createHttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
}

const httpLink = createIsomorphLink();

const splitLink = split(
  // modify
  () => false,
  httpLink,
  authLink.concat(errorLink).concat(httpLink) // Order is important
);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
