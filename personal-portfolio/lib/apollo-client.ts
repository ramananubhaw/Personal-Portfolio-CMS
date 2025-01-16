import { ApolloClient, InMemoryCache } from "@apollo/client";

// console.log(process.env.NEXT_PUBLIC_ADMIN_URL);

const apolloClient: ApolloClient<any> = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ADMIN_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;