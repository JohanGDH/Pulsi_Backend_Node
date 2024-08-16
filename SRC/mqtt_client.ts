import mqtt from 'mqtt';
import { DataBuffer } from './API/models/pulsi_model';
import mqtt_client from './API/services/mqtt_service';

// MQTT broker URL
const MQTT_BROKER_URL = 'mqtt://localhost:1883';

// MQTT client options
const options: mqtt.IClientOptions = {
  clientId: 'pulsi-backend',
  clean: true,
};

// Create MQTT client
const client = mqtt.connect(MQTT_BROKER_URL, options);

let dataBuffer: DataBuffer = {};


// MQTT client event handlers
client.on("connect", () => {
  console.log("- Conectado al broker MQTT");
  // Subscribe to a topic
});

client.on("message", (topic, message) => {

  dataBuffer = mqtt_client.addDataToBuffer(topic, message, dataBuffer);
  
  mqtt_client.processBuffer(dataBuffer);
  
});

client.on("error", (error) => {
  console.error("MQTT client error:", error);
});

// client.on("close", () => {
//   console.log("Disconnected from MQTT broker");
// });

export default client;