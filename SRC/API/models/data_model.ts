import mongoose, { Schema, Document } from "mongoose";

interface IRawData extends Document {
    timestamp: Date;
    IR_signal: number,
    Red_signal : number;
}

interface IProcessedData extends Document {
    timestamp: Date;
    oxygen_level: number;
    pulse_rate: number;
}

const raw_data_schema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  IR_signal: { type: Number, required: true },
  Red_signal: { type: Number, required: true },
}, 
{_id: false}
);

const processed_data_schema = new mongoose.Schema(
  {
    timestamp: { type: String, default: Date.now },
    oxygen_level: { type: Number, required: true },
    pulse_rate: { type: Number, required: true },
  },
  { _id: false }
);

export { raw_data_schema, processed_data_schema, IRawData, IProcessedData };
