import { DataSource } from 'typeorm';
import { Empleado } from './Empleado';

export const AppDataSource = new DataSource({
  type: 'mysql', // o el tipo de base de datos que estés utilizando
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_turnero',
  entities: [Empleado],
  synchronize: true,
  logging: true,
});
