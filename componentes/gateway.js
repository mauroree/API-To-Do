const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());

const apiProxy = createProxyMiddleware('/api', {
  target: 'http://localhost:3000/lembretes', 
  changeOrigin: true,
});

app.use(apiProxy);

app.get('/gateway', (req, res) => {
  res.send('Bem-vindo à API Gateway!');
});


app.listen(port, () => {
  console.log(`API Gateway rodando na porta ${port}`);
});
    