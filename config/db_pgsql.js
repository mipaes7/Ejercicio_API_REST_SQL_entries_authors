const { Pool } = require('pg');

// require('dotenv').config()

// Datos de conexión

// PARA USAR CON RENDER
const pool = new Pool({
  host: 'dpg-cpop272j1k6c73ac5aog-a.frankfurt-postgres.render.com',
  user: 'demonodesql_user',
  port: '5432',
  database: 'demonodesql',
  password: 'F9Yd72thuj4tr6wojw6YVDAUVLqd6Fx0',
  ssl: {
    rejectUnauthorized: false
  }
});


// PARA USAR EN LOCAL CON DOCKER
// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: '5432',
//     database: 'postgres',
//     password: '123456'
//   });

// PARA USAR CON DOTENV
//   const pool = new Pool({ 
//     user: process.env.PG_USER, 
//     host: process.env.PG_HOST, 
//     database: process.env.PG_DATABASE, 
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT
// })

module.exports = pool;