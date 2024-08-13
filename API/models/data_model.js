const mongoose = require("mongoose");

const raw_data_schema = new mongoose.Schema({

    timestamp: { type: string, default: Date.now },
    raw_data: { type: string, required: true },

});

const processed_data_schema = new mongoose.Schema({

    timestamp: { type: string, default: Date.now },
    oxygen_level: { type: Number, required: true },
    pulse_rate: { type: Number, required: true },

});

const raw_data_model = mongoose.model("raw_data", raw_data_schema);
const processed_data_model = mongoose.model("processed_data", processed_data_schema);

module.exports = raw_data_model, processed_data_model;