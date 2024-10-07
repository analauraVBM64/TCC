const connection = require('./db');

// Criar banco de dados e tabela
const createDatabaseAndTable = async () => {
    const dbName = 'agro';

    // Cria o banco de dados
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, results) => {
        if (err) {
            console.error('Erro ao criar banco de dados: ', err);
            return;
        }
        console.log('Banco de dados criado ou já existe.');
    });

    // Usa o banco de dados
    connection.query(`USE ${dbName}`, (err) => {
        if (err) {
            console.error('Erro ao usar banco de dados: ', err);
            return;
        }
        console.log(`Usando banco de dados: ${dbName}`);
    });

    // Cria a tabela
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    connection.query(createTableSQL, (err, results) => {
        if (err) {
            console.error('Erro ao criar tabela: ', err);
            return;
        }
        console.log('Tabela "usuarios" criada ou já existe.');
    });
};

// Executa a função
createDatabaseAndTable().then(() => connection.end());
