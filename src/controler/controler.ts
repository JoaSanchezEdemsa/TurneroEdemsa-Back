import { Request, Response } from "express";
import { AppDataSource, pdb} from '../persistance/db';
import  {Turn}  from '../persistance/turno';

export const getTurno = async (_: Request, res: Response) => {
    const turno = await AppDataSource.manager.find(Turn);
    res.json(turno);
}

export const addTurnoToDB = async () => {
    pdb.map(async (p: Turn) => {
        const newTurno = new Turn(p.nombre, p.apellido, p.dni, p.fecha);
        await AppDataSource.manager.save(newTurno);
    });
}