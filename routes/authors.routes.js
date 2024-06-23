const express = require('express');
const authorsController = require("../controllers/authors.controller");
const router = express.Router();
const { validateGetAuthorsByEmail, validateCreateAuthor, validateUpdateAuthor, validateDeleteAuthor } = require("../validators/authors.validator");


router.get('/', validateGetAuthorsByEmail, authorsController.getAuthors);
router.post('/', validateCreateAuthor, authorsController.createAuthor);
router.put('/', validateUpdateAuthor, authorsController.updateAuthor);
router.delete('/', validateDeleteAuthor, authorsController.deleteAuthor);


module.exports = router;

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/authors
// ejemplo para POST:
// let newAuthor = { 
//     name: "Jonás",
//     surname: "Villanueva",
//     email: "jonas@thebridgeschool.es",
//     image: "imagendejonas"
// }
