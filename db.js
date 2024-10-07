const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Altere para seu nome de usuário se não for 'root'
    password: 'aluno01', // Insira a senha correta aqui
    database: 'agro' // O nome do seu banco de dados
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = connection;
