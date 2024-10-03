import { DataSource } from "typeorm"
import { Turn } from "./turno"
import { Motive } from "./motivo"
import { Subsidiary } from "./sucursal"
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
    entities: [Turn, Motive, Subsidiary],
    subscribers: [],
    migrations: []
})

export type Turno ={
    id: number,
    nombre: string,
    apellido: string,
    dni: number,
    fecha: string
}

export type Motivo ={
    id: number,
    motivo: string,
    tiempo_estimado: string
}

export type Sucursal ={
    id: number,
    numero_sucursal: number,
    nombre_sucursal: string
}


// export const tdb:Array <Turno> = [
//     {
//         id: 1,
//         nombre: 'Alfonso',
//         apellido: 'Magallanes',
//         dni: 47332098,        
//         fecha: "3/10/2024"
//     },
// ]

 export const mdb:Array <Motivo> = [
    {
        id: 1,
        motivo: 'Reclamo',
        tiempo_estimado: '5 minutos'
    }, 
]

export const sdb:Array <Sucursal> = [
    {
        id: 1,
        numero_sucursal: 1301,
        nombre_sucursal: 'Las Heras'
    },
]
    
