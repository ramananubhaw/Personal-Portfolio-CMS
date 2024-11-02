import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import App from './App.tsx';
import './index.css';

const link = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_API,
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
