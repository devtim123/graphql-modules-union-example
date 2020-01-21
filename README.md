# graphql-modules + typegraphql + graphql-apollo-server example

simple GraphQL-Apollo-Server example demonstrate a bug when using unions in combination with graphql-modules + typegraphql + apollo-server. would like to know how to solve this problem or how to debug it.

commands to reproduce the issue:
```
git clone git@github.com:devtim123/graphql-modules-union-example.git
cd graphql-modules-union-example
yarn install
yarn dev
```
and visit http://localhost:4000

start query at playground:
```
query example {
  example {
    __typename
    ... on Actor {
      name
      age
    }
    ... on Movie {
      name
      rating
    }
  }
}

```

expected result:
```
{
  "data": {
    "example": {
      "__typename": "Movie",
      "name": "Fight Club",
      "rating": 999
    }
  }
}
```

current result:
```
{
  "data": {
    "example": {
      "__typename": "Movie"
    }
  }
}
```

For this simple example, creating the schema via (see Line #15 @ src/server.ts), the resolver works as expected:

```
const schema = await buildSchema({
    resolvers: [rootModule.resolvers]
});
```

But this works not in larger GraphQL-Modules projects, where i get the following error on startup:

```
TypeError: Cannot convert undefined or null to object
```

This Repo is linked in the issue: https://github.com/Urigo/graphql-modules/issues/619

I hope we can find a solution there...