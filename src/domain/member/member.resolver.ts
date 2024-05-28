import { injectable } from 'tsyringe';
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateMemberInput, Member } from './member.schema';
import { RequestContext } from 'src/common/net/request.context';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { dataSource } from '../../common/db/typeorm.client';
import { PaginationListArgs } from '../_paging/list.pagination';

@injectable()
@Resolver(of => Member)
export class MemberResolver {
  private readonly memberRepository: Repository<Member>;

  constructor() {
    this.memberRepository = dataSource.getRepository(Member);
  }

  @Mutation(returns => Member, { description: 'Create new member' })
  async createMember(
    @Ctx() ctx: RequestContext,
    @Arg('member') member: CreateMemberInput,
  ): Promise<Member> {
    const createdMember = this.memberRepository.save({
      ...member,
      code: ctx.requestId,
    });
    return createdMember;
  }

  @Query(returns => [Member], { description: 'Get list member' })
  async members(
    @Ctx() ctx: RequestContext,
    @Args() pagination: PaginationListArgs,
  ): Promise<Member[]> {
    let filters: FindManyOptions = {
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
    };

    if (pagination.search) {
      filters = {
        ...filters,
        where: {
          name: Like(`%${pagination.search}%`),
        },
      };
    }
    const data = await this.memberRepository.find(filters);
    return data;
  }
}
