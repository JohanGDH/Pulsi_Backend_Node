import { NextFunction, Request, Response } from "express";
import { pulsi_model, IPulsi } from "../models/pulsi_model";
import  mqtt_client  from "../services/mqtt_service";


const controller = {


    listPulsis: (req: Request, res: Response, next: NextFunction) => {
        
        pulsi_model.find({}).sort('+pulsi_ID')
            .then((pulsis: IPulsi[]) => {
                
                if(!pulsis || (pulsis.length == 0)) return res.status(404).send({ message: "No hay pulsis que listar"});
                
                res.status(200).send({

                    message: "Datos obtenidos correctamente",   
                    pulsis,

                });
            })
            .catch((err) => {

                next(err);
            });

    },

    getPulsiByID: (req: Request, res: Response, next: NextFunction) => {

        const pulsi_ID = req.params.pulsi_ID;

        if (pulsi_ID ? !pulsi_ID : !pulsi_ID.trim()) {
            return res.status(400).send({ message: "El ID del pulsi es requerido" });
        };  

        pulsi_model.findOne({ pulsi_ID: pulsi_ID })
            .then((pulsi: IPulsi | null) => {
                if (!pulsi) {
                    return res.status(404).send({ message: "No se han encontrado los datos" });
                }
                return res.status(200).send({
                    pulsi,
                    message: "Datos obtenidos correctamente",
                });
            })
            .catch((err) => {
                next(err);

        });
    },

    savePulsi: (req: Request, res: Response, next: NextFunction) => {
            

            const new_pulsi = new pulsi_model();
            const params: any = req.body;

            new_pulsi.pulsi_ID = params.pulsi_ID;

    
            if (!new_pulsi || !new_pulsi.pulsi_ID) {
                return res.status(400).send({ message: "Los datos del pulsi son requeridos" });
            }
            
            new_pulsi
                .save()
                .then((pulsi: IPulsi) => {
                    res.status(200).send({
                      pulsi,
                      message: `Pulsi ${pulsi['pulsi_ID']} guardado correctamente`,
                    });

                    // Conexión al pulsi mediante MQTT
                    mqtt_client.publishMessage(pulsi.pulsi_ID, {
                      message: `Conexión inicializada con el pulsi: ${pulsi.pulsi_ID}`,
                    });
                    mqtt_client.subscribeToTopic(pulsi.pulsi_ID);
                })
                .catch((err) => {
                    next(err);
                });              
                
            },

    updatePulsi: (req: Request, res: Response, next: NextFunction) => {
        
        
        const update: Partial<IPulsi> = req.body;
        const pulsi_ID = req.params.pulsi_ID;

        if (!update.pulsi_ID) {
            return res.status(400).send({ message: "El ID pulsi es requerido" });
        }

        pulsi_model.findOneAndUpdate({ pulsi_ID: pulsi_ID}, update, { new: true })
            .then((updatedPulsi: IPulsi | null) => {
                if (!updatedPulsi) {
                    return res.status(404).send({ message: "No se han encontrado los datos" });
                }
                return res.status(200).send({
                    updatedPulsi,
                    message: "Datos actualizados correctamente",
                });
            })
            .catch((err) => {
                next(err);
            });
    },


    deletePulsi: (req: Request, res: Response, next: NextFunction) => {
    
        const pulsi_ID = req.params.pulsi_ID;

        if (!pulsi_ID) {
            return res.status(400).send({ message: "El ID pulsi es requerido" });
        }

        pulsi_model.findOneAndDelete({ pulsi_ID: pulsi_ID })
            .then((deletedPulsi: IPulsi | null) => {
                if (!deletedPulsi) {
                    return res.status(404).send({ message: "No se han encontrado los datos" });
                }

                mqtt_client.unSubscribeToTopic(deletedPulsi.pulsi_ID);
                return res.status(200).send({
                    deletedPulsi,
                    message: "Datos eliminados correctamente",
                });
            })
            .catch((err) => {
                next(err);
            });
    },

    connectToPulsi: (req: Request, res: Response, next: NextFunction) => {
        
        const pulsi_ID = req.params.pulsi_ID;

        if (!pulsi_ID) {
            return res.status(400).send({ message: "El ID pulsi es requerido" });
        }

        try {
            mqtt_client.subscribeToTopic(pulsi_ID);
            res.status(200).send({ message: "Conectado al pulsi correctamente" });
        }
        catch (err) {
            next(err);
        }
    }

}

export { controller };