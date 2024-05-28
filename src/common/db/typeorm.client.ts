import { DataSource } from 'typeorm';
import { entities } from './entities.collection';

console.log(__dirname);
export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'eigen.sqlite',
  entities,
  logging: true,
  synchronize: true,
});
