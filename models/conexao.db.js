const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((error) => {
  if (error) {
    console.log("DEBUG > Mensagem de ERRO - "+error.message);
    throw error;
  } else {
    console.log("DEBUG > Mensagem de OK - Conexão realizada com sucesso!");
  }
});

module.exports = connection;