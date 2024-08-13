import mongoose, { Schema, Document } from 'mongoose';
import { raw_data_schema, processed_data_schema, IProcessedData, IRawData } from './data_model';

interface IPulsi extends Document {
  pulsi_ID: string;
  raw_data: IRawData; 
  processed_data: IProcessedData;
  timestamp: Date;
}


const pulsi_schema = new mongoose.Schema({
  pulsi_ID: { type: String, required: true },
  raw_data: raw_data_schema,
  processed_data: processed_data_schema,
  timestamp: { type: Date, default: Date.now },
});

const pulsi_model = mongoose.model<IPulsi>("pulsi", pulsi_schema);

export { pulsi_model, IPulsi };