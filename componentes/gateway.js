const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());

const authProxy = createProxyMiddleware('/login', {

  target: 'http://localhost:5000',
  changeOrigin: true,

});

app.use(authProxy);

const authProtegido = createProxyMiddleware('/protegido', {

  target: 'http://localhost:5000',
  changeOrigin: true,

});

app.use(authProtegido);

const apiProxy = createProxyMiddleware('/lembretes', {

  target: 'http://localhost:3002',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {

    const token = req.headers['authorization'];

    if (token) {
      proxyReq.setHeader('Authorization', token);

    } else {
      res.status(401).send({ error: 'Acesso não autorizado' });
    }
  },
});

app.use(apiProxy);

const apiIdProxy = createProxyMiddleware('/lembretes/id', {

  target: 'http://localhost:3002',
  changeOrigin: true,

  onProxyReq: (proxyReq, req, res) => {

    const token = req.headers['authorization'];

    if (token) {
      proxyReq.setHeader('Authorization', token);

    } else {
      res.status(401).send({ error: 'Acesso não autorizado' });
    }
  },
});

app.use(apiIdProxy);

// Rota para acessar a API GraphQL
const graphqlProxy = createProxyMiddleware('/inicio', {

  target: 'http://localhost:3000',
  changeOrigin: true,

  onProxyReq: (proxyReq, req, res) => {

    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).send({ error: 'Acesso não autorizado' });
    }
  },
});

app.use(graphqlProxy);


app.listen(port, () => {
  console.log(`Gateway rodando na porta ${port}`);
});
