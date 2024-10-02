import { Request, Response } from "express";
import { AppDataSource, tdb } from '../persistance/db';
import { Turn }  from '../persistance/turno';
import { Motive }  from '../persistance/motivo';
import { Subsidiary }  from '../persistance/sucursal';

export const getTurno = async (_: Request, res: Response) => {
    const turno = await AppDataSource.manager.find(Turn);
    res.json(turno);
}

export const getMotivo = async (_: Request, res: Response) => {
    const motivo = await AppDataSource.manager.find(Motive);
    res.json(motivo);
}

export const getSucursal = async (_: Request, res: Response) => {
    const sucursal = await AppDataSource.manager.find(Subsidiary);
    res.json(sucursal);
}

export const addTurnoToDB = async () => {
    tdb.map(async (p: Turn) => {
        const newTurno = new Turn(p.nombre, p.apellido, p.dni, p.fecha);
        await AppDataSource.manager.save(newTurno);
    });
}