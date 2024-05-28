import { Max, Min, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class PaginationListArgs {
  @Field({ nullable: false, defaultValue: 1, description: 'skip page x of x' })
  page!: number;

  @Field({
    nullable: false,
    defaultValue: 10,
    description: 'take x count data of each page',
  })
  @Min(10)
  @Max(20)
  pageSize!: number;

  @Field({ nullable: true })
  @MinLength(3)
  search?: string;
}
