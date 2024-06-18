const author = require('../models/authors.model');

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
const getAuthors = async (req, res) => {
    let authors;
    try {
        if (req.query.email) {
            authors = await author.getAuthorByEmail(req.query.email);
        }
        else {
            authors = await author.getAllAuthors();
        }
        res.status(200).json(authors); // [] con las authors encontradas
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//createAuthor
// POST http://localhost:3000/api/authors
// let newAuthor = { 
//     name: "Jonás",
//     surname: "Villanueva",
//     email: "jonas@thebridgeschool.es",
//     image: "imagendejonas"
// }

// Crear autor por email
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {name,surname,email,image}
    if ('name' in newAuthor && 'surname' in newAuthor && 'email' in newAuthor && 'image' in newAuthor) {
        try {
            const response = await author.createAuthor(newAuthor);
            res.status(201).json({
                "items_created": response,
                data: newAuthor
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el author" });
    }
};

//updateAuthor
// PUT http://localhost:3000/api/authors 
// const updatedAuthor =  { 
//     "name": "JonnyBravo",
//     "surname": "Villanueva",
//     "email": "jonas@thebridgeschool.es",
//     "image": "imagendeJonas",
//     "ref_email": "jonas@thebridgeschool.es"
// }

// Update author por email
const updateAuthor = async (req, res) => {
    const modifiedAuthor = req.body; // {name, surname, email, image, ref_email}
    if ('name' in modifiedAuthor && 'surname' in modifiedAuthor && 'email' in modifiedAuthor && 'image' in modifiedAuthor && 'ref_email' in modifiedAuthor) {
        try {
            const response = await author.updateAuthor(modifiedAuthor);
            res.status(201).json({
                "items_updated": response,
                data: modifiedAuthor
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el entry" });
    }
};

// deleteAuthor
// DELETE http://localhost:3000/api/authors?email=email@correo.es --> por email
const deleteAuthor = async (req, res) => {
    let authors;
    try {
        authors = await author.deleteAuthor(req.query.email);
        res.status(200).json(authors); // [] con los authors encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}


module.exports = {
    getAuthors,
    createAuthor,
    deleteAuthor, // --> DELETE
    updateAuthor // --> PUT
};
