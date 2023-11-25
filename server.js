const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

// Configuração do SQL Server
const config = {
    user: 'senac',
    password: '123456',
    server: 'pc\SQLEXPRESS',
    database: 'SenacBD',
    options: {
        encrypt: true, // Configuração para conexões com o Azure
    },
};

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Rota de validação de login
app.post('localhost:8080/login', async (req, res) => {
    const  { username, password } = req.body;

    try {
        // Conectar ao banco de dados
        await sql.connect(config);

        // Consultar o banco de dados para verificar as credenciais
        const result = await sql.query`
            SELECT * FROM tb_user
            WHERE nomeusuario = ${username} AND senha = ${password}
        `;

        // Verificar se o usuário foi encontrado
        if (result.recordset.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    } finally {
        // Fechar a conexão com o banco de dados
        await sql.close();
    }
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
