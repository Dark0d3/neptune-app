import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return ( 
    <UserProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}