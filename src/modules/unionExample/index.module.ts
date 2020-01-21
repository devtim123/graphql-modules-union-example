import { GraphQLModule } from '@graphql-modules/core';
import {buildSchemaSync} from 'type-graphql';
import {unionExampleResolver} from "./resolver/genericListen.resolver";

const resolvers = [
  unionExampleResolver,
];

export const unionExampleModule = new GraphQLModule({
  name: 'genericListen',
  providers: () => [
    ...resolvers,
  ],
  extraSchemas: () => [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => context.injector,
    }),
  ],
});
