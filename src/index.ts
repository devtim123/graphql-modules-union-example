import 'reflect-metadata';
import http from 'http';
import app from './app';
import {port} from './env';
import {getApolloServer} from './server';
import {hostSetup, httpProtocol, webSocketProtocol} from "./env";

const main = async () => {

  const apolloServer = await getApolloServer();

  apolloServer.applyMiddleware({
    app,
    path: '/api',
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(port, () => {
    console.log(`🚀 ApolloServer ready at ${httpProtocol}://${hostSetup}:${port}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ${webSocketProtocol}://${hostSetup}:${port}${apolloServer.subscriptionsPath}`);
  });
};

main();