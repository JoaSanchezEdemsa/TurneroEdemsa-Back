import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subsidiary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 1000,
  })
  numero_sucursal!: number;

  @Column()
  nombre_sucursal!: string;

  constructor(numero_sucursal: number, nombre_sucursal: string) {
    this.numero_sucursal = numero_sucursal;
    this.nombre_sucursal = nombre_sucursal;
}
}

