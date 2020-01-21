import {createUnionType, Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export class Movie {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  rating?: number;
}

@ObjectType()
export class Actor {
  @Field({nullable: true})
  name?: string;

  @Field(__type => Int, {nullable: true})
  age?: number;
}

export const GenericListenUnion = createUnionType({
  name: "GenericListen", // the name of the GraphQL union
  types: () => [Actor, Movie], // array of object types classes
});