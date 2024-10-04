import { Request, Response, NextFunction } from 'express';

// Middleware para verificar autenticación
const autenticacionUsuario = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token as string; // Obtén el token desde los parámetros de consulta

    // Verifica si el token está presente y es válido
    if (!token || token !== token) { // Cambia la condición según tu lógica de autenticación
        return res.redirect('https://accounts.edemsa.local?from=http://turnero:8080'); // Redirige a la página de inicio de sesión
    }

    // Si el token es válido, permite el acceso al siguiente middleware/ruta
    next();
};

export default autenticacionUsuario;
