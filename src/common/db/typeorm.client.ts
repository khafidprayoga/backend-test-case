import { DataSource } from 'typeorm';
import { Member } from '../../domain/member/member.schema';

console.log(__dirname);
export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'member.sqlite',
  entities: [Member],
  logging: true,
  synchronize: true,
});
