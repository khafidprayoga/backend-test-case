import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID, { description: 'the unique member id' })
  public readonly code: string;

  @Column()
  @Field()
  public name: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}

@ObjectType()
export class MemberList {
  @Field(type => [Member])
  public data: Member[];

  @Field()
  public count: number;
}

@InputType()
export class CreateMemberInput {
  @Field()
  public name: string;
}
