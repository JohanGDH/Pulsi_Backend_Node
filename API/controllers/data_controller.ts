// Import any required modules or models
  import { NextFunction, Request, Response } from "express";

import  {    raw_data_schema, 
            processed_data_schema, 
            IRawData, 
            IProcessedData 
        }   from '../models/data_model';
import { pulsi_model } from '../models/pulsi_model';
import { nextTick } from "process";

// Función de validación
const validateParams = (params: any): boolean => {
  return (
    params &&
    typeof params.pulsi_ID === 'string' &&
    typeof params.raw_data === 'string' &&
    typeof params.processed_data === 'string' &&
    typeof params.timestamp === 'string' // O el tipo que corresponda, por ejemplo, 'number' si es un timestamp numérico
  );
};
        

const controller = {
  // Define your controller methods
  getData: (req: Request, res: Response, next: NextFunction) => {
    // Implement your logic to fetch data from the database or any other source
    // const data = DataModel.find();
    // Return the data as a response
    // res.json(data);
  },

  createData: (req: Request, res: Response, next: NextFunction) => {
    
    // Implement your logic to create new data
    const new_data = new pulsi_model();
    const params = req.body;

    if(!validateParams(params)) {
      return res.status(400).send({ message: "Los datos del pulsi son requeridos" });
    }

    new_data
      .save()
      .then((data) => {
        res.status(200).send({
          data: data,
            message: "Datos guardados correctamente",
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  updateData: (req: Request, res: Response, next: NextFunction) => {
    // Implement your logic to update existing data
    // const updatedData = DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Return the updated data as a response
    // res.json(updatedData);
  },

  deleteData: (req: Request, res: Response, next: NextFunction) => {
    // Implement your logic to delete data
    // DataModel.findByIdAndDelete(req.params.id);
    // Return a success message as a response
    // res.json({ message: 'Data deleted successfully' });
  },
};


// Export your controller methods
export { controller}