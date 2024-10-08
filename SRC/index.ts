import express from 'express';
import mongoose from "mongoose";

import app from "./app";
import simulatePulsi from './API/tests/pulsi_simulator';


const port = 3030;

// URL de conexión a MongoDB
const url = "mongodb+srv://Testeo:testeo_1@clusterpulsi.s84w9.mongodb.net/?retryWrites=true&w=majority&appName=clusterPulsi";

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB usando Mongoose
mongoose
  .connect(url)
  .then(() => {
    console.log("- Conectado a la base de datos de MongoDB\n//////////////////////////////////////////////////////////////// \n");

    // Simulación de un pulsi
    simulatePulsi();
  })
  .catch((err:any) => {
    console.error("Error al conectar a la base de datos", err);
  });

    // Define tus rutas aquí
  app.get("/", (req: any, res: any) => {
    res.send("¡Hola, mundo!");
  });

  // Inicia el servidor
  app.listen(port, () => {
    console.log(
      `\n//////////////////////////////////////////////////////////////// \n- Servidor inicializado y escuchando en http://localhost:${port}`
    );
  });


