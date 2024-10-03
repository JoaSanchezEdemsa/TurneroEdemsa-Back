import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  dni!: number;

  @Column()
  fecha!: string;

  constructor(nombre: string, apellido: string, dni: number, fecha: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fecha = fecha;
}
}

