// Import any required modules or models

const pulsi_data = require("../models/data_model");

const controller = {
        // Define your controller methods
    getData : (req, res) => {
        // Implement your logic to fetch data from the database or any other source
        // const data = DataModel.find();

        // Return the data as a response
        // res.json(data);
    },

    createData : (req, res) => {
        // Implement your logic to create new data
        const  new_data = new  pulsi_data();

        const params = req.body;

        new_data.pulsi_ID = params.pulsi_ID;
        new_data.raw_data = params.raw_data;
        new_data.processed_data = params.processed_data;
        new_data.timestamp = params.timestamp;
        
        new_data.save((err, data) => {

            if (err) {
                return res.status(500).send({ message: "Error al guardar los datos" });
            };

            if (!data) {
                return res.status(404).send({ message: "No se han podido guardar los datos, sin respuesta de la base de datos" });
            };

            return res.status(200).send({ 
                
                data: data,
                message: "Datos guardados correctamente"
            
            });


        });
    
    },
    
    updateData : (req, res) => {
        // Implement your logic to update existing data
        // const updatedData = DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Return the updated data as a response
        // res.json(updatedData);
    },

    deleteData : (req, res) => {
        // Implement your logic to delete data
        // DataModel.findByIdAndDelete(req.params.id);

        // Return a success message as a response
        // res.json({ message: 'Data deleted successfully' });
    },
};


// Export your controller methods
module.exports = {
    getData,
    createData,
    updateData,
    deleteData,
};