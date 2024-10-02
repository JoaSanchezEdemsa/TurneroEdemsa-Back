import { DataSource } from "typeorm"
import { Turn } from "./turno"
// import Motivo from "./motivo"
// import Sucursal from "./sucursal"
// import Usuario from "./usuario"
import "reflect-metadata"
import "dotenv/config"

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'; MySQL Auth Failed Solution

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Turn],
    subscribers: [],
    migrations: []
})

export type Turno ={
    id: number,
    nombre: string,
    apellido: string,
    dni: number,
    fecha: Date
}

export const pdb:Array <Turno> = [
    {
        id: 1,
        nombre: 'Alfonso',
        apellido: 'Magallanes',
        dni: 47332098,        
        fecha: new Date()
    },
]