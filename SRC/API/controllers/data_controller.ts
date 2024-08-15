// Import any required modules or models
  import { NextFunction, Request, Response } from "express";

import  {    raw_data_schema, 
            processed_data_schema, 
            IRawData, 
            IProcessedData 
        }   from '../models/data_model';
import { IPulsi, pulsi_model } from '../models/pulsi_model';

// Función de validación
const validateParams = (params: any): boolean => {
  return (
    params &&
    typeof params.pulsi_ID === "string" &&
    typeof params.raw_data === "object" &&
    typeof params.processed_data === "object"
  );
};
        

const controller = {
  // Define your controller methods
  getData: (req: Request, res: Response, next: NextFunction) => {
    
    const pulsi_ID = req.body.pulsi_ID;

    pulsi_model.findOne({ pulsi_ID: pulsi_ID })
      .then((pulsi: IPulsi | null) => {
        if(!pulsi || (pulsi.raw_data.length == 0 && pulsi.processed_data.length == 0)) {
          return res.status(404).send({ message: "No se han encontrado los datos" });
        }

        return res.status(200).send({
          raw_data: pulsi.raw_data,
          processed_data: pulsi.processed_data,
          message: "Datos obtenidos correctamente",
        });

      })
      .catch((err) => {
        next(err);
      });

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

  addData: (req: Request, res: Response, next: NextFunction) => {
    
    const params = req.body;


    if(!validateParams(params)) {
      return res.status(400).send({ message: "Los datos del pulsi son requeridos" });
    }


    pulsi_model.findOneAndUpdate({ 
      pulsi_ID: params.pulsi_ID 
    }, {
      $push: {
        raw_data:{ $each :params.raw_data},
        processed_data: {$each: params.processed_data},
      }
    }, {
      new: true,
      runValidators: true,
    })
      .then((updatedPulsi: IPulsi | any) => {
        
        if (!updatedPulsi) {
          return res
            .status(404)
            .send({ message: "No se ha encontrado el pulsi a actualizar" });
        }

        const lastTwoRawData = updatedPulsi.raw_data.slice(-2); // Obtener los dos últimos elementos del array
        const lastTwoProcessedData = updatedPulsi.processed_data.slice(-2); // Obtener los dos últimos elementos del array

        res.status(200).send({
          pulsiID: updatedPulsi.pulsi_ID,
          lastRawData: lastTwoRawData,
          lastProcessedData: lastTwoProcessedData,
          message: "Datos actualizados correctamente",
        });
      })
      .catch((err) => {
        next(err);
    })

  },

  deleteData: (req: Request, res: Response, next: NextFunction) => {
    // Implement your logic to delete data
    // DataModel.findByIdAndDelete(req.params.id);
    // Return a success message as a response
    // res.json({ message: 'Data deleted successfully' });
  },
};


// Export your controller methods
export { controller }