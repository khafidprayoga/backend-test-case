import { inject, injectable } from 'tsyringe';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MemberRepository } from './member.repository';
import { Member } from './member.schema';
import { RequestContext } from 'src/common/net/request.context';

@injectable()
@Resolver(of => Member)
export class MemberResolver {
  constructor(
    @inject(MemberRepository)
    private readonly memberRepository: MemberRepository,
  ) {}

  @Query(returns => [Member], { description: 'Get list member' })
  async members(@Ctx() ctx: RequestContext): Promise<Member[]> {
    const data = await this.memberRepository.getMembers();
    return data;
  }

  @Mutation(returns => Member, { description: 'Create new member' })
  async createMember(
    @Ctx() ctx: RequestContext,
    @Arg('name') name: string,
  ): Promise<Member> {
    const rep = this.memberRepository.get();
    const member = rep.create({
      name,
    });

    return this.memberRepository.createMember(member);
  }
}
