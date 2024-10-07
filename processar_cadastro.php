<?php
// Configurações do banco de dados
$servername = "localhost";
$username_db = "root"; // Nome de usuário do banco
$password_db = ""; // Senha do banco (se houver)
$dbname = "agro"; // Nome do banco de dados

// Cria a conexão
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Obtém os dados do formulário
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

// Validações básicas
if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
    die("Todos os campos são obrigatórios.");
}

// Verifica se as senhas coincidem
if ($password !== $confirmPassword) {
    die("Erro: As senhas não coincidem.");
}

// Criptografa a senha
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Proteção contra SQL Injection usando prepared statements
$stmt = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $passwordHash);

if ($stmt->execute()) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar usuário: " . $conn->error;
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>
