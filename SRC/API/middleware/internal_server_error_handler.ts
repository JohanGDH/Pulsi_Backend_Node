import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";


const handleErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: string[]
) => {
  console.error(message);
  return res.status(statusCode).json({ message, errors });
};

const internalServerErrorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    
  if (err instanceof SyntaxError) {
    console.error("SyntaxError:", err.message);
    return res
      .status(400)
      .json({ message: "Error de sintaxis en el JSON de la petición" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => error.message);
    console.error("ValidationError:", err.message);
    return res
        .status(400)
        .json({ message: "Error de validación", errors });
  }

  if (err instanceof mongoose.Error.CastError) {
    console.error("CastError:", err.message);
    return res
            .status(400)
            .json({ message: `Error de tipo: ${err.message}` });
  }

  return handleErrorResponse(res, 500, "Error interno del servidor");

};


export default internalServerErrorHandler;