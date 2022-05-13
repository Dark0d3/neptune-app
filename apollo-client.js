import * as Realm from "realm-web";
import { ApolloClient, createHttpLink, InMemoryCache, HttpLink } from '@apollo/client';

export const APP_ID = "neptune_realm_1-uwjwy";

async function getValidAccessToken() {
    if (!app.currentUser) {
      await app.logIn(Realm.Credentials.anonymous());
    } else {
      await app.currentUser.refreshCustomData();
    }
    return app.currentUser.accessToken
}

const app = new Realm.App(APP_ID);

const graphqlUri = "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/neptune_realm_1-uwjwy/graphql"

const client = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUri,
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache()
  });

export default client;




