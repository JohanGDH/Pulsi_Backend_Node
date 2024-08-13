import express from 'express';
// const mongoose = require("mongoose");

import app from "./app";


const port = 3000;

// URL de conexión a MongoDB
const url = "mongodb://localhost:27017/pulsi_db";

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB usando Mongoose
// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Conectado a la base de datos de MongoDB");


//   })
//   .catch((err) => {
//     console.error("Error al conectar a la base de datos", err);
//   });SS

      // Define tus rutas aquí
    app.get("/", (req: any, res: any) => {
      res.send("¡Hola, mundo!");
    });

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });

