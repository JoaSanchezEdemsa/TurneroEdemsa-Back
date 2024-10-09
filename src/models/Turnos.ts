import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('turnos') 
export class Turno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  dni!: number;

  @Column({ nullable: true })
  COD_CLI!: number; 

  @Column()
  cliente!: string; 

  @Column()
  created_at!: Date;

  @Column()
  fecha_turno!: Date;

  @Column({ nullable: true })
  finalizado_at!: Date;

  @Column({ nullable: true })
  finalizado_by!: string;

  @Column()
  _motivo_id!: number;

  @Column()
  COD_UNICOM!: number;

  @Column({ nullable: true })
  atendido_by!: number;

  @Column({ nullable: true })
  atendido_at!: Date; 

  @Column({ nullable: true })
  atendido_box_id!: number; 

}