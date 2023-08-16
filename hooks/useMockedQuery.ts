import { DocumentNode } from 'graphql';

interface MockedOptions {
  mockData?: any;
  mockError?: any;
}

export function useMockedQuery(queryOrMutation: DocumentNode, options: MockedOptions) {
  
  return {
    data: options.mockData,
    error: options.mockError,
    loading: false,
    execute: async () => options.mockData, 
  };
}
