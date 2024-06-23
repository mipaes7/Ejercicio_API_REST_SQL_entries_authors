const entry = require('../models/entries.model'); // Importar el modelo de la BBDD
const {validationResult} = require("express-validator");

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo


// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
    let entries;
    try {
        if (req.query.email || req.query.email == '') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            entries = await entry.getEntriesByEmail(req.query.email);
        }
        else {
            entries = await entry.getAllEntries();
        }
        res.status(200).json(entries); // [] con las entries encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newEntry = req.body; // {title,content,email,category}
    if ('title' in newEntry && 'content' in newEntry && 'email' in newEntry && 'category' in newEntry) {
        try {
            const response = await entry.createEntry(newEntry);
            res.status(201).json({
                "items_created": response,
                data: newEntry
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el entry" });
    }
};

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

// Update entry por email
const updateEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedEntry = req.body; // {title, content, date, email, category, old_title}
    if ('title' in modifiedEntry && 'content' in modifiedEntry && 'date' in modifiedEntry && 'email' in modifiedEntry && 'category' in modifiedEntry && 'old_title' in modifiedEntry) {
        try {
            const response = await entry.updateEntry(modifiedEntry);
            res.status(201).json({
                "items_updated": response,
                data: modifiedEntry
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el entry" });
    }
};

// deleteEntry
// DELETE http://localhost:3000/entries?title=titledelaentry --> por email
const deleteEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let entries;
    try {
        entries = await entry.deleteEntry(req.query.title);
        res.status(200).json(entries); // [] con las entries encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}

module.exports = {
    getEntries,
    createEntry,
    deleteEntry, // --> DELETE
    updateEntry // --> PUT
}