import mongoose, { Schema, Document } from "mongoose";

interface IRawData extends Document {
    timestamp: Date;
    raw_data: string;
}

interface IProcessedData extends Document {
    timestamp: Date;
    oxygen_level: number;
    pulse_rate: number;
}

const raw_data_schema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    raw_data: { type: String, required: true },
});

const processed_data_schema = new mongoose.Schema({
    timestamp: { type: String, default: Date.now },
    oxygen_level: { type: Number, required: true },
    pulse_rate: { type: Number, required: true },
});

export { raw_data_schema, processed_data_schema, IRawData, IProcessedData };
