import mongoose, { Schema, Document } from 'mongoose';
import { raw_data_schema, processed_data_schema, IProcessedData, IRawData } from './data_model';

interface IPulsi extends Document {
  pulsi_ID: string;
  raw_data: IRawData[]; 
  processed_data: IProcessedData[];
  timestamp: Date;
}

interface DataBuffer {
  [pulsi_ID: string]: {
    raw_data: IRawData[];
    processed_data: IProcessedData[];
  };
}

const pulsi_schema = new mongoose.Schema({
  pulsi_ID: { type: String, required: true },
  raw_data: { type: [raw_data_schema], required: false},
  processed_data:{ type: [processed_data_schema], required: false},
  timestamp: { type: Date, default: Date.now, required: false },
}, {
  collection: "pulsis",
  _id: true
});

const pulsi_model = mongoose.model<IPulsi>("pulsi", pulsi_schema);

export { pulsi_model, IPulsi , DataBuffer };