import { pulsi_model, IPulsi } from "../models/pulsi_model";


const controller = {


    getPulsiByID: (req, res) => {

        const pulsi_ID = req.params.pulsi_ID;

        if (pulsi_ID ? !pulsi_ID : !pulsi_ID.trim()) {
            return res.status(400).send({ message: "El ID del pulsi es requerido" });
        };  

        pulsi_model.findOne({ pulsi_ID: pulsi_ID }, (err, pulsi) => {

            if (err) {
                return res.status(500).send({ message: "Error al buscar los datos" });
            };

            if (!pulsi) {
                return res.status(404).send({ message: "No se han encontrado los datos" });
            };

            return res.status(200).send({ 
                pulsi

            });

        });
    }

}