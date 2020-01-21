import {
  Query,
  Resolver,
} from 'type-graphql';
import {Actor, GenericListenUnion, Movie} from "../union/GenericListenUnion";

@Resolver()
export class unionExampleResolver {

  @Query(_returns => GenericListenUnion)
  async example(): Promise<Actor | Movie> {

    const tmpActor = new Actor();
    tmpActor.name = "Brad Pitt";
    tmpActor.age= 56;

    const tmpMovie = new Movie();
    tmpMovie.name = "Fight Club";
    tmpMovie.rating= 999;

    return Math.random() > 0.49 ? tmpMovie : tmpActor;
  }
}
