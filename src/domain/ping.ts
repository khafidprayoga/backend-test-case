import { Field, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
export class Ping {
  @Field()
  message: string;
}

@Resolver(of => Ping)
export class PingResolver {
  @Query(returns => Ping)
  public ping(): Ping {
    const ping: Ping = {
      message: 'pong',
    };

    return ping;
  }
}
