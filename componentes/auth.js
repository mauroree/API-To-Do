const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const port = 5000;

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

const secretKey = generateSecretKey();

console.log(secretKey);

const user = {
  
  id: 1,
  username: 'mrxjr',
  password: '123456987',
  loggedIn: false

};

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;

  console.log('Tentativa de login:', { username, password });

  if (username === user.username && password === user.password) {
    console.log('Comparação de senha bem-sucedida:', { username });

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    user.loggedIn = true; // Define o status de login como true

    console.log('Login bem-sucedido:', { username });

    res.json({ message: 'Login Bem sucedido!', token });
  } else {
    console.log('Comparação de senha falhou:', { username });

    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});


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

app.get('/protegido', authenticateToken, (req, res) => {
  res.json({ message: 'Acesso autorizado!', user: req.user });
});

app.listen(port, () => {
  console.log(`API de autenticação rodando na porta ${port}`);
});
