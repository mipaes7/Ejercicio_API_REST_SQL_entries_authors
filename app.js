const express = require("express");
const app = express(); // Inicializar servidor
const port = 3000;

// //Importar middlewares
// const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// // Logger
app.use(morgan(':method :url :status - :response-time ms :body'));

// Rutas
const entriesRoutes = require("./routes/entries.routes");
const authorsRoutes = require("./routes/authors.routes");

app.use(express.json()); // Habilito recepción de JSON en servidor

app.get("/", (req, res) => { // Servidor tiene esta ruto
    res.send("ZAWARUDO!");
});

// Rutas
//API
app.use('/api/entries',entriesRoutes);
app.use('/api/authors',authorsRoutes);

// //Invocar middleware
// app.use(error404); //Middleware para manejo de 404

app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});