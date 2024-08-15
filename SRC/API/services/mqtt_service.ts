import client from "../../mqtt_client";

import { DataBuffer } from "../models/pulsi_model";
import { IPulsi } from "../models/pulsi_model";
import { controller as dataController } from "../controllers/data_controller";

const mqtt_client = {
  subscribeToTopic: (pulsiID: IPulsi["pulsi_ID"]) => {
    client.subscribe(pulsiID, (err) => {
      if (err) {
        console.error("Error al suscribirse al tópico", err);
      } else {
        console.log(`Suscrito correctamente a: ${pulsiID}`);
      }
    });
  },

  unSubscribeToTopic: (pulsiID: IPulsi["pulsi_ID"]) => {
    client.unsubscribe(pulsiID, (err) => {
      if (err) {
        console.error("Error al desuscribirse al tópico", err);
      } else {
        console.log(`Desuscrito correctamente a: ${pulsiID}`);
      }
    });
  },

  publishMessage: (pulsiID: IPulsi["pulsi_ID"], message: [ IPulsi['raw_data'], IPulsi['processed_data']]) => {

    const [raw_data, processed_data] = message;
    const payload = JSON.stringify({ 
      raw_data, 
      processed_data,
      date: new Date().toISOString(), 
    });

    client.publish(pulsiID, payload, (err) => {
      if (err) {
        
        console.error("Error al publicar mensaje", err);
      } else {
        console.log(`Mensaje publicado en ${pulsiID}: 
                    ${payload}`
        );
      }
    });
  },

  endConnection: () => {
    client.end(() => {
      console.log("Conexión MQTT finalizada");
    });
  },


  addDataToBuffer: (topic: IPulsi['pulsi_ID'] ,message: Buffer, dataBuffer: DataBuffer) => {

    const data = JSON.parse(message.toString());
    const pulsiID = topic;

    if (!dataBuffer[pulsiID]) {
      
        dataBuffer[pulsiID] = {
          raw_data: [data.raw_data],
          processed_data: [data.processed_data],
        }
      
    } else {
      dataBuffer[pulsiID].raw_data.push(data.raw_data);
      dataBuffer[pulsiID].processed_data.push(data.processed_data);
    }
    
    return dataBuffer;
  },

  processBuffer: (dataBuffer: DataBuffer) => {

    if (Object.keys(dataBuffer).length >= 50) {

      for (const pulsiID in dataBuffer) {
        const data = dataBuffer[pulsiID];
        const raw_data = data.raw_data;
        const processed_data = data.processed_data;

        // Procesar datos
        dataController.addData(pulsiID, raw_data, processed_data);    


        // Limpiar buffer
        delete dataBuffer[pulsiID];
      }
    }
  }


};

export default mqtt_client;
