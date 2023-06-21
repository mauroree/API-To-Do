const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const port = 5000;
app.use(express.json());

// Gera uma chave secreta aleatória
function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Chave secreta para assinar os tokens JWT
    const secretKey = generateSecretKey();

    console.log(secretKey);

    const user = {
    id: 1,
    username: 'mrxjr',
    password: '$2b$10$3a2rjkgU9Lg5a5Vc/g3EKecWEq8/nr9S9RfDvihsFvh.HxprMEfO6', 
    
};

    // Rota de autenticação
    app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe e a senha está correta
    if (username === user.username && bcrypt.compareSync(password, user.password)) {
        // Gerar token JWT com a identificação do usuário
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
    });

    // Middleware para verificar a autenticação do token JWT
    function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
        return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
    }

// Rota protegida que requer autenticação
app.get('/protegido', authenticateToken, (req, res) => {
  res.json({ message: 'Acesso autorizado!', user: req.user });
});

// Inicie o servidor da API de autenticação
app.listen(port, () => {
  console.log(`API de autenticação rodando na porta ${port}`);
});
