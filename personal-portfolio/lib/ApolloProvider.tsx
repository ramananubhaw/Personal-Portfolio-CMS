// lib/ApolloProvider.tsx
"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apollo-client";

interface Props {
  children: ReactNode;
}

const ApolloWrapper = ({ children }: Props) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
