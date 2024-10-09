import { DataSource } from 'typeorm';
import { Empleado } from './Empleado';
import { Turno } from './Turnos';

export const AppDataSource = new DataSource({
  type: 'mysql', // o el tipo de base de datos que estés utilizando
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_turnero',
  entities: [Empleado, Turno],
  synchronize: true,
  logging: true,
});
