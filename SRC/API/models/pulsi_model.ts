import mongoose, { Schema, Document } from 'mongoose';
import { raw_data_schema, processed_data_schema, IProcessedData, IRawData } from './data_model';

interface IPulsi extends Document {
  _id: string;
  pulsi_ID: string;
  raw_data: IRawData[]; 
  processed_data: IProcessedData[];
  timestamp: Date;
}


const pulsi_schema = new mongoose.Schema({
  _id: { type: String, required: false},
  pulsi_ID: { type: String, required: true },
  raw_data: { type: [raw_data_schema], required: false},
  processed_data:{ type: [processed_data_schema], required: false},
  timestamp: { type: Date, default: Date.now },
}, {
  collection: "pulsis",
  
});

const pulsi_model = mongoose.model<IPulsi>("pulsi", pulsi_schema);

export { pulsi_model, IPulsi };