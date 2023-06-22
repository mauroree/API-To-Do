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
  target: 'http://localhost:3000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Verificar se o token de autenticação está presente no cabeçalho da requisição
    const token = req.headers['authorization'];

    if (token) {
      // Adicionar o token ao cabeçalho da requisição para a API de lembretes
      proxyReq.setHeader('Authorization', token);
    } else {
      // Se o token não estiver presente, negar o acesso
      res.status(401).send({ error: 'Acesso não autorizado' });
    }
  }
});

app.use(apiProxy);

const apiIdProxy = createProxyMiddleware('/lembretes/id', {
  target: 'http://localhost:3000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {

    const token = req.headers['authorization'];

    if (token) {

      proxyReq.setHeader('Authorization', token);
    } else {

      res.status(401).send({ error: 'Acesso não autorizado' });
    }
  }
});

app.use(apiIdProxy);

app.listen(port, () => {
  console.log(`Gateway rodando na porta ${port}`);
});
