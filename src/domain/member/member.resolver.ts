import { injectable } from 'tsyringe';
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateMemberInput, Member, MemberList } from './member.schema';
import { RequestContext } from 'src/common/net/request.context';
import { FindManyOptions, IsNull, Like, Repository } from 'typeorm';
import { dataSource } from '../../common/db/typeorm.client';
import { PaginationListArgs } from '../_paging/list.pagination';
import { type Nullable } from '../../common/const/type.const';

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

  @Mutation(returns => Boolean, { description: 'Delete member by code' })
  async deleteMember(@Arg('code') code: string): Promise<boolean> {
    const member = await this.memberRepository.findOneBy({ code });
    if (!member || member.deletedAt !== null) {
      return false;
    }

    member.deletedAt = new Date();
    await this.memberRepository.save(member);
    return true;
  }

  @Query(returns => MemberList, { description: 'Get list member' })
  async members(
    @Ctx() ctx: RequestContext,
    @Args() pagination: PaginationListArgs,
  ): Promise<MemberList> {
    let filters: FindManyOptions = {
      skip: pagination.skip,
      take: pagination.pageSize,
      where: {
        deletedAt: IsNull(),
      },
    };

    if (pagination.search) {
      filters = {
        ...filters,
        where: {
          ...filters.where,
          name: Like(`%${pagination.search}%`),
        },
      };
    }

    const [data, count] = await this.memberRepository.findAndCount(filters);
    return {
      data,
      count,
    };
  }

  @Query(returns => Member, {
    description: 'Get member by code',
    nullable: true,
  })
  async member(@Arg('code') code: string): Promise<Nullable<Member>> {
    return this.memberRepository.findOneBy({
      code,
    });
  }
}
