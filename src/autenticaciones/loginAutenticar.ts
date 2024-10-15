import { Request, Response, NextFunction } from 'express';

const autenticacionUsuario = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token as string; 

    if (!token || token !== token) { 
        return res.redirect('https://accounts.edemsa.local?from=http://turnero:3000'); 
    }

    next();
};

export default autenticacionUsuario;
