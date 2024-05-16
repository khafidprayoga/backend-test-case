import { MemberResolver } from './domain/member/member.resolver';
import { PingResolver } from './domain/ping';

export const resolvers = [MemberResolver, PingResolver] as const;
