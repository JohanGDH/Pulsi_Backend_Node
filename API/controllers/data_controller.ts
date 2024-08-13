// Import any required modules or models
import { Request, Response } from "express";
import  {    raw_data_schema, 
            processed_data_schema, 
            IRawData, 
            IProcessedData 
        }   from '../models/data_model';

import { pulsi_model } from '../models/pulsi_model';

const handleError = (res: Response, err: any, message: string) => {
  console.error(err);
  res.status(500).send({ message });
};


const controller = {
  // Define your controller methods
  getData: (req: Request, res: Response) => {
    // Implement your logic to fetch data from the database or any other source
    // const data = DataModel.find();
    // Return the data as a response
    // res.json(data);
  },

  createData: (req: Request, res: Response) => {
    // Implement your logic to create new data
    const new_data = new pulsi_model();
    const params = req.body;

    new_data.pulsi_ID = params.pulsi_ID;
    new_data.raw_data = params.raw_data;
    new_data.processed_data = params.processed_data;
    new_data.timestamp = params.timestamp;

    new_data
      .save()
      .then((data) => {
        res.status(200).send({
          data: data,
          message: "Datos guardados correctamente",
        });
      })
      .catch((err) => {
        handleError(res, err, "Error al guardar los datos");
      });
  },

  updateData: (req: Request, res: Response) => {
    // Implement your logic to update existing data
    // const updatedData = DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Return the updated data as a response
    // res.json(updatedData);
  },

  deleteData: (req: Request, res: Response) => {
    // Implement your logic to delete data
    // DataModel.findByIdAndDelete(req.params.id);
    // Return a success message as a response
    // res.json({ message: 'Data deleted successfully' });
  },
};


// Export your controller methods
module.exports = {
    controller
};