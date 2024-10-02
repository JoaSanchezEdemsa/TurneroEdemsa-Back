import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Motive {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 1000,
  })
  motivo!: string;

  @Column()
  tiempo_estimado!: string;

  constructor(motivo: string, tiempo_estimado: string) {
    this.motivo = motivo;
    this.tiempo_estimado = tiempo_estimado;
}
}

