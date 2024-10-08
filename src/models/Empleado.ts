import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empleados') // Se puede agregar un nombre de tabla aquí
export class Empleado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  legajo!: number;

  @Column()
  usuario!: string; // Asumí que es el nombre de usuario, ajusta si es necesario

  @Column({ nullable: true })
  COD_UNICOM!: number; // Si necesitas un valor único, puedes agregar unique: true

  @Column()
  nombrecompleto!: string;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  posicion!: string;

  @Column({ nullable: true })
  direccion!: string;

  @Column({ nullable: true })
  telefono!: string;

  @Column({ nullable: true })
  celular!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  lugar!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  tipoDoc!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  dni!: number; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  nacimiento!: string; // Puedes usar Date si prefieres un objeto de fecha

  @Column({ nullable: true })
  edad!: number; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  sexo!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  tipousuario!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  empresa!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  interno!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  bloqueado!: number; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  baja!: number; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  pass!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  created_at!: Date; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  created_by!: string; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  autorizado_at!: Date; // Agregado según tu objeto de empleado

  @Column({ nullable: true })
  autorizado_by!: string; // Agregado según tu objeto de empleado

  // Puedes agregar más campos según necesites
}
