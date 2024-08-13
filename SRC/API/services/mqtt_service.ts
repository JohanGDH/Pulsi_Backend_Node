import client from "../../mqtt_client";
import { IPulsi } from "../models/pulsi_model";

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
};

export default mqtt_client;
