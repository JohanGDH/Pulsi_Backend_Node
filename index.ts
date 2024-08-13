import express from 'express';
// const mongoose = require("mongoose");

const app = require("./app");


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
//   });


      // Define tus rutas aquí
    app.get("/", (req, res) => {
      res.send("¡Hola, mundo!");
    });

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });

