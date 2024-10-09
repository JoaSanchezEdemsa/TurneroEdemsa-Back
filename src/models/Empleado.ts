import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empleados') 
export class Empleado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  legajo!: number;

  @Column()
  usuario!: string; 

  @Column({ nullable: true })
  COD_UNICOM!: number; 

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
  celular!: string; 

  @Column({ nullable: true })
  lugar!: string; 

  @Column({ nullable: true })
  tipoDoc!: string; 

  @Column({ nullable: true })
  dni!: number; 

  @Column({ nullable: true })
  nacimiento!: string; 

  @Column({ nullable: true })
  edad!: number; 

  @Column({ nullable: true })
  sexo!: string; 

  @Column({ nullable: true })
  tipousuario!: string; 

  @Column({ nullable: true })
  empresa!: string; 

  @Column({ nullable: true })
  interno!: string; 

  @Column({ nullable: true })
  bloqueado!: number; 

  @Column({ nullable: true })
  baja!: number; 

  @Column({ nullable: true })
  pass!: string; 

  @Column({ nullable: true })
  created_at!: Date; 

  @Column({ nullable: true })
  created_by!: string; 

  @Column({ nullable: true })
  autorizado_at!: Date; 

  @Column({ nullable: true })
  autorizado_by!: string; 
  
}
