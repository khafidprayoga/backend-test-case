import { ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Book extends BaseEntity {}
