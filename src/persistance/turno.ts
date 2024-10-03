import { Entity, Column, PrimaryGeneratedColumn, EntityManager } from "typeorm";

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

static async agregarTurno(nombre: string, apellido: string, dni: number, fecha: string, entityManager: EntityManager):Promise <void> {
    const newTurno = new Turn(nombre, apellido, dni, fecha);
    newTurno.nombre = nombre;
    newTurno.apellido = apellido;
    newTurno.dni = dni;
    newTurno.fecha = fecha;
    await entityManager.save(newTurno);
}
}

