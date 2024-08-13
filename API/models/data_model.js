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


const pulsi_schema = new mongoose.Schema({

    pulsi_ID: { type: String, required: true },
    raw_data: raw_data_schema,
    processed_data: processed_data_schema,
    timestamp: {type: Date, default: raw_data.timestamp},

})

const pulsi_model = mongoose.model("pulsi_data", pulsi_schema);

module.exports = pulsi_model;