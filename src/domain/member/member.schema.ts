import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID, { description: 'the unique member id' })
  public readonly code: string;

  @Column()
  @Field()
  public name: string;
}
