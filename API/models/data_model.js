const mongoose = require("mongoose");

const pulsi_data_schema = new mongoose.Schema({

    pulsi_ID: { type: String, required: true },
    raw_data: { type: String, required: true },
    processed_data: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now },

})

const pulsi_data_model = mongoose.model("pulsi_data", pulsi_data_schema);

module.exports = pulsi_data_model;