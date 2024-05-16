import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Member {
  @Field(type => ID, { description: 'the unique member id' })
  public readonly code: string;

  @Field()
  public name: string;
}
