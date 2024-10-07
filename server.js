const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir arquivos estáticos

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Altere para o caminho correto do seu arquivo HTML
});

// Endpoint para registrar um usuário
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Criptografa a senha (pode usar bcrypt, mas aqui vou usar uma abordagem simples)
    const passwordHash = Buffer.from(password).toString('base64'); // Simples codificação base64

    const sql = `INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)`;
    connection.query(sql, [username, email, passwordHash], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário: ', err);
            return res.status(500).send('Erro ao cadastrar usuário');
        }
        res.send({ message: 'Cadastro realizado com sucesso!' });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
