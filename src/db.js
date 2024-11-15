//Conexão com o Banco de Dados
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect((error) => {
    if (error) throw error;
    console.log(`Conectado ao banco de dados.`);
});

module.exports = connection;
