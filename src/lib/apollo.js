import { ApolloClient, InMemoryCache } from "@apollo/client";

export function initializeApollo() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql", // adjust as needed
    cache: new InMemoryCache(),
  });
}
