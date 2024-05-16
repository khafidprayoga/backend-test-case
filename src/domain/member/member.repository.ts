import { injectable } from 'tsyringe';
import { Member } from './member.schema';
import { type Repository } from 'typeorm';
import { dataSource } from '../../common/db/typeorm.client';

@injectable()
export class MemberRepository {
  private readonly memberRepository: Repository<Member>;
  constructor() {
    this.memberRepository = dataSource.getRepository(Member);
  }

  public async createMember(member: Member): Promise<Member> {
    return this.memberRepository.save(member);
  }

  public async getMember(code: string): Promise<Member | null> {
    return this.memberRepository.findOne({
      where: { code },
    })!;
  }
  public async getMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }
}
