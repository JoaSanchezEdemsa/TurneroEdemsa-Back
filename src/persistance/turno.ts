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
  created_at!: Date;

  @Column()
  finalized_at!: Date;

  constructor(nombre: string, apellido: string, dni: number, created_at: Date, finalized_at: Date, ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.created_at = new Date();
    this.finalized_at = new Date();
    }

static async agregarTurno(nombre: string, apellido: string, dni: number, created_at: Date, finalized_at: Date,  entityManager: EntityManager):Promise <void> {
    const newTurno = new Turn(nombre, apellido, dni, created_at, finalized_at);
    newTurno.nombre = nombre;
    newTurno.apellido = apellido;
    newTurno.dni = dni;
    newTurno.created_at = new Date();
    newTurno.finalized_at = new Date();
    await entityManager.save(newTurno);
}
}

