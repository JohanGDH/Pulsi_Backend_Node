import mqtt from "mqtt";
import axios from "axios";
import { parseISO, format } from "date-fns";


const brokerUrl = 'mqtt://localhost:1883';
const backendUrl = 'http://localhost:3030';


const generateRandomId = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString().substring(2); // Eliminar "0."

  const timestampNumber = parseInt(timestamp.toString(), 10);
  const randomNumber = parseInt(randomString, 10);

  const result = timestampNumber + randomNumber;

  return result.toString().substring(0, 4);
};

function generatePulsiData(startTimeStr: string) {

  const timestamp = new Date();
  const formatedDate = format(timestamp, "yyyy-MM-dd'T'HH:mm:ss");

  // Generar datos brutos
  const IR_signal = Math.floor(Math.random() * (1600 - 1400 + 1)) + 1400;
  const Red_signal = Math.floor(Math.random() * (1500 - 1300 + 1)) + 1300;
  const rawData = [
    {
      timestamp: formatedDate,
      IR_signal,
      Red_signal,
    },
  ];

  // Generar datos procesados
  const oxygen_level = parseFloat((Math.random() * (99 - 94) + 94).toFixed(1));
  const pulse_rate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
  const processedData = [
    {
      timestamp: formatedDate,
      oxygen_level,
      pulse_rate,
    },
  ];

  return {
    raw_data: rawData,
    processed_data: processedData,
  };
}



const sendPostRequest = async (pulsi_ID: string) => {

  try {
    const response = await axios.post(`${backendUrl}/api/pulsi`, { pulsi_ID});

    console.log(`${response.data.message}`);
    return true

  } catch (error) {
    console.error(error);
  }

  return false;

}

const simulatePulsi = async () => {

  const pulsi_ID = generateRandomId();
  let connected = false;
  
  while(!connected) {

    connected = await sendPostRequest(pulsi_ID);
    
    if (!connected) {
      console.log("Reintentando conexión...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const client = mqtt.connect(brokerUrl);

  client.on('connect', () => {

    console.log(" \nLogs Pulsi\nPulsi conectado al broker MQTT");
    const topic = `${pulsi_ID}`;

    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Error al suscribirse al tópico", err.message);
      } else {
        console.log(`Pulsi Suscrito correctamente a: ${topic}`);
      }

    });
   
    const publishData = async () => {

      let iterations = 0;

      while (iterations < 100) {
        const data = generatePulsiData('2021-06-01T00:00:00Z');
        const payload = JSON.stringify(data);
        client.publish(topic, payload, (err) => {
          if (err) {
            console.error("Error al publicar mensaje", err.message);
          } else {
            console.log(`Mensaje publicado en ${topic}: ${payload}\n`);
          }
        });

        iterations++;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }      
    }

    publishData();
  });

}


export default simulatePulsi;