import { inject, injectable } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { MemberRepository } from './member.repository';
import { Member } from './member.schema';
import { RequestContext } from 'src/common/request.context';

@injectable()
@Resolver(of => Member)
export class MemberResolver {
  constructor(
    @inject(MemberRepository)
    private readonly memberRepository: MemberRepository,
  ) {}

  @Query(returns => [Member], { description: 'Get list member' })
  members(@Ctx() ctx: RequestContext): Member[] {
    const data = this.memberRepository.getMembers();
    return data;
  }
}
