import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'member.sqlite',
  entities: ['src/domain/**/*.schema.ts'],
  logging: true,
  synchronize: true,
});
