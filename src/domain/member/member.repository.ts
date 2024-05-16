import { Member } from './member.schema';

export class MemberRepository {
  private members: Member[] = [
    {
      code: 'M001',
      name: 'Angga',
    },
    {
      code: 'M002',
      name: 'Ferry',
    },
    {
      code: 'M003',
      name: 'Putri',
    },
  ];

  getMembers(): Member[] {
    return this.members;
  }
}
