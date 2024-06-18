const { Pool } = require('pg');
const pool = require('../config/db_pgsql')
const queries = require('../queries/entries.queries') // Queries SQL

// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
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
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE

// let newEntry = { 
    // title: "Se acabaron las mandarinas de TB",
    // content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    // date: "2024-06-17",
    // email: "guillermu@thebridgeschool.es",
    // category: "sucesos",
    // old_title: "El título anterior"
// }

const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
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
// let newEntry = { 
    // title: "Se acabaron las mandarinas de TB",
    // content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    // date: "2024-06-17",
    // email: "guillermu@thebridgeschool.es",
    // category: "sucesos",
    // old_title: "El título anterior"
// }

const updateEntry = async (entry) => {
    const { title, content, date, email, category, old_title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry,[title, content, date, email, category, old_title]);
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

const deleteEntry = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntry,[title]);
        result = data.fields;
    } catch (error) {
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
    return result;
};

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry
}

module.exports = entries;


// Pruebas

/*     getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data)) */



// getAllEntries() 
// .then(data=>console.log(data))


//creamos una nueva entry
// let newEntry = { 
    // title: "Se acabaron las mandarinas de TB",
    // content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    // email: "guillermu@thebridgeschool.es",
    // category: "sucesos"
// }
// 
// createEntry(newEntry)
    // .then(data => console.log(data));
// 



// actualizar un campo
// const updatedEntry = { 
//     title: "Otra prueba lunes 17 de junio",
//     content: "King in the castle",
//     date: "2024-06-17",
//     email: "guillermu@thebridgeschool.es",
//     category: "Borat",
//     old_title: "Otra prueba lunes 17 de junio"
// }

// updateEntry(updatedEntry)
//     .then(data => console.log(data));


//borrar un campo
// deleteEntry("Amanece Madrid lleno de arena").then(data => console.log(data));
