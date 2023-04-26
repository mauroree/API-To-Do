# Documentação API To-Do List

## A API de Lembretes é uma aplicação backend que permite aos usuários armazenar, recuperar, atualizar e excluir lembretes. Ele expõe endpoints REST que são consumidos por aplicativos cliente ou serviços de terceiros.

### URL:

O servidor roda em: http://localhost:3000.

### Rotas:

As seguintes rotas estão disponíveis na API de Lembretes:

### Listar todos os lembretes

Retorna uma lista de todos os lembretes armazenados no banco de dados.

**Requisição:**

* GET /lembretes

**Resposta:**

arquivo.json

[
 {
  
  "_id": "607f28fc62c2fc8e8d4620a7", <br>
    "nome": "Comprar leite", <br>
    "assunto": "Compras", <br>
    "notas": "Comprar leite no mercado", <br>
    "dataHora": "2023-04-26T12:30:00.000Z", <br>
    "__v": 0 <br>
  },
 
 {
    "_id": "607f28fc62c2fc8e8d4620a8", <br>
    "nome": "Fazer exercícios", <br>
    "assunto": "Saúde", <br>
    "notas": "Fazer exercícios por 30 minutos", <br>
    "dataHora": "2023-04-26T18:00:00.000Z", <br> 
    "__v": 0 <br>
  }
]


### Adicionar um novo lembrete

**Requisição:**

* POST /lembretes


nome (String, obrigatório): o nome do lembrete; <br>
assunto (String, obrigatório): o assunto do lembrete; <br>
notas (String, opcional): notas adicionais para o lembrete; <br>
dataHora (Date, obrigatório): a data e hora em que o lembrete deve ser realizado. <br>

**Exemplo de corpo de requisição:**

arquivo.json <br>
{
    "nome": "Mercado", <br>
    "assunto": "Compras", <br>
    "notas": "Pão, leite, queijo, café", <br>
    "dataHora": "2023-05-01T09:00:00.000Z" <br>
}

* PUT /lembretes/:id

### Atualiza um lembrete existente. Requer o ID do lembrete a ser atualizado.

**Exemplo de corpo de requisição:**

arquivo.json <br>
{
    "nome": "Mercado", <br>
    "assunto": "Compras", <br>
    "notas": "Pão, leite, queijo, café, água, açúcar", <br>
    "dataHora": "2023-05-01T10:00:00.000Z"  <br>
}

* DELETE /lembretes/:id

**Deleta um lembrete existente. Requer o ID do lembrete a ser deletado.**

* DELETE /lembretes

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

