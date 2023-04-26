# Documentação API To-Do List

## A API de Lembretes é uma aplicação backend que permite aos usuários armazenar, recuperar, atualizar e excluir lembretes.

### URL:

O servidor roda em: http://localhost:3000.

### Rotas:

As seguintes rotas estão disponíveis na API:

### Listar todos os lembretes

Retorna uma lista de todos os lembretes armazenados no banco de dados.

**Requisição: GET /lembretes** 

**Resposta:**

arquivo.json

    "_id": "607f28fc62c2fc8e8d4620a7",
    "nome": "Comprar leite", 
    "assunto": "Compras", 
    "notas": "Comprar leite no mercado", 
    "dataHora": "2023-04-26T12:30:00.000Z", 
    "__v": 0 
  
    "_id": "607f28fc62c2fc8e8d4620a8",
    "nome": "Fazer exercícios", 
    "assunto": "Saúde", 
    "notas": "Fazer exercícios por 30 minutos", 
    "dataHora": "2023-04-26T18:00:00.000Z",  
    "__v": 0

### Adicionar um novo lembrete

**Requisição: POST /lembretes**

    nome (String, obrigatório): o nome do lembrete;
    assunto (String, obrigatório): o assunto do lembrete;
    notas (String, opcional): notas adicionais para o lembrete;
    dataHora (Date, obrigatório): a data e hora em que o lembrete deve ser realizado.

**Exemplo de corpo de requisição:**

arquivo.json

    "nome": "Mercado", 
    "assunto": "Compras", 
    "notas": "Pão, leite, queijo, café", 
    "dataHora": "2023-05-01T09:00:00.000Z" 

**Requisição: PUT /lembretes/:id**

### Atualiza um lembrete existente. Requer o ID do lembrete a ser atualizado.

**Exemplo de corpo de requisição:**

arquivo.json 

    "nome": "Mercado", 
    "assunto": "Compras", 
    "notas": "Pão, leite, queijo, café, água, açúcar", 
    "dataHora": "2023-05-01T10:00:00.000Z" 
  
**Requisição: DELETE /lembretes/:id**

**Deleta um lembrete existente. Requer o ID do lembrete a ser deletado.**

**Requisição: DELETE /lembretes**

**Deleta todos os lembretes existentes.**

## Respostas
### As seguintes respostas podem ser enviadas pela API:

**200 OK**

A requisição foi bem sucedida e o resultado é retornado no corpo da resposta.

**201 Created**

O novo recurso foi criado com sucesso.

**204 No Content**

A requisição foi bem sucedida e não há conteúdo para ser retornado.

**400 Bad Request**

A requisição não pôde ser processada devido a um erro no corpo da requisição ou nos parâmetros da URL.

**404 Not Found**

O recurso solicitado não foi encontrado.

**500 Internal Server Error**

O servidor encontrou um erro ao processar a requisição.

