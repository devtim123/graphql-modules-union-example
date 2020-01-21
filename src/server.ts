import { ApolloServer } from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';
import cookie from 'cookie';
import {unionExampleModule} from "./modules/unionExample/index.module";
// import {buildSchema} from "type-graphql";

export const getApolloServer = async () => {

  const rootModule = new GraphQLModule({
    name: 'root',
    imports: [unionExampleModule],
  });

  //if this schema is used in apollo server it works, but problem exists with larger GraphQL-Modules, because Server throws "TypeError: Cannot convert undefined or null to object"
  // const schema = await buildSchema({
  //   resolvers: [rootModule.resolvers]
  // });

  return new ApolloServer({
    schema: rootModule.schema,
    context: (session: any) => {
      if (session.connection) {
        const req = session.connection.context.session.request;
        const cookies = req.headers.cookie;
        if (cookies) {
          req.cookies = cookie.parse(cookies);
        }
      }
      return rootModule.context(session);
    },
  });
};

