const { Pool } = require('pg');
const pool = require('../config/db_pgsql')
const queries = require('../queries/authors.queries') // Queries SQL

// const connection = 'postgres://demonodesql_user:F9Yd72thuj4tr6wojw6YVDAUVLqd6Fx0@dpg-cpop272j1k6c73ac5aog-a.frankfurt-postgres.render.com/demonodesql?sslmode=require';
// const pool = new Pool({
//     connection
//   });

// GET
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorByEmail, [email])
        result = data.rows   
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
        // client.end();
    }
    return result
};

// CREATE

// let newAuthor = { 
    // name: "Jonás",
    // surname: "Villanueva",
    // email: "jonas@thebridgeschool.es",
    // image: 
// }

const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// UPDATE
// let newAuthor = { 
    // name: "Jonás",
    // surname: "Villanueva",
    // email: "jonas@thebridgeschool.es",
    // image: "imagendeJonas"
// }

const updateAuthor = async (author) => {
    const { name, surname, email, image, ref_email } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[name, surname, email, image, ref_email]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}; 

//DELETE
const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAuthor,[email]);
        result = data.fields;
    } catch (error) {
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
    return result;
};

const authors = {
    getAuthorByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;

// Pruebas

// getAuthorByEmail("birja@thebridgeschool.es")
// .then(data=>console.log(data)); 

// getAllAuthors() 
// .then(data=>console.log(data))

//creamos un nuevo autor
// let newAuthor = { 
//     name: "Jonás",
//     surname: "Villanueva",
//     email: "jonasv@thebridgeschool.es",
//     image: "imagendejonas"
// }

// createAuthor(newAuthor)
//     .then(data => console.log(data));

// actualizar un autor
// const updatedAuthor =  { 
//     name: "Jonny",
//     surname: "Villanueva",
//     email: "jonas@thebridgeschool.es",
//     image: "imagendeJonas",
//     ref_email: "jonas@thebridgeschool.es"
// }

// updateAuthor(updatedAuthor)
//     .then(data => console.log(data));

//borrar un autor por email
// deleteAuthor("muchelle@thebridgeschool.es").then(data => console.log(data));
