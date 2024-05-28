import { Max, Min, MinLength } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationListArgs {
  @Min(1)
  @Field(type => Int, {
    nullable: false,
    defaultValue: 1,
    description: 'skip page x of x',
  })
  page!: number;

  @Field(type => Int, {
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

  get skip(): number {
    switch (this.page) {
      case 1:
        return 0;
      default:
        return (this.page - 1) * this.pageSize;
    }
  }
}
