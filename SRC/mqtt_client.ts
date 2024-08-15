import mqtt from 'mqtt';

// MQTT broker URL
const MQTT_BROKER_URL = 'mqtt://broker.example.com';

// MQTT client options
const options: mqtt.IClientOptions = {
  clientId: 'mqtt-client',
  clean: true,
};

// Create MQTT client
const client = mqtt.connect(MQTT_BROKER_URL, options);

// MQTT client event handlers
// client.on("connect", () => {
//   console.log("Connected to MQTT broker");
//   // Subscribe to a topic
// });

// client.on("message", (topic, message) => {
//   console.log(`Received message on topic ${topic}: ${message.toString()}`);
// });

// client.on("error", (error) => {
//   console.error("MQTT client error:", error);
// });

// client.on("close", () => {
//   console.log("Disconnected from MQTT broker");
// });

export default client;