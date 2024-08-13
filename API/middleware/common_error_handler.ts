import { Request, Response, NextFunction } from "express";

const commonErrorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    console.error(err.stack);
    res.status(500).send({ message: "Ha ocurrido un error inesperado en el servidor" });
}       

export default commonErrorHandler;