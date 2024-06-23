const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();
const { validateGetEntriesByEmail, validateCreateEntries, validateDeleteEntry, validateUpdateEntry } = require("../validators/entries.validator");

router.get('/', validateGetEntriesByEmail, entriesController.getEntries);
router.post('/', validateCreateEntries, entriesController.createEntry);
router.put('/', validateUpdateEntry, entriesController.updateEntry);
router.delete('/', validateDeleteEntry, entriesController.deleteEntry);

module.exports = router;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */

//updateEntry
// PUT http://localhost:3000/api/entries 
// const updatedEntry = { 
//     "title": "Otra prueba lunes 17 de junio",
//     "content": "King in the castle",
//     "date": "2024-06-17",
//     "email": "guillermu@thebridgeschool.es",
//     "category": "Borat",
//     "old_title": "Otra prueba lunes 17 de junio"
// }