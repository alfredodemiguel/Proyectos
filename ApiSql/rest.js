require ('dotenv').config({path:'./.env'});

const rest = new (require('rest-mssql-nodejs'))({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    server:process.env.DB_SERVER,
    port:1433,
    database:process.env.DB_DATABASE
    });


module.exports = rest;