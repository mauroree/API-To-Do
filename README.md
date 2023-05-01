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
### Atualizar um lembrete existente. Requer o ID do lembrete a ser atualizado.

**Requisição: PUT /lembretes/:id**

**Exemplo de corpo de requisição:**

arquivo.json 

    "nome": "Mercado", 
    "assunto": "Compras", 
    "notas": "Pão, leite, queijo, café, água, açúcar", 
    "dataHora": "2023-05-01T10:00:00.000Z" 
  
### Deletar um lembrete existente. Requer o ID do lembrete a ser deletado.

**Requisição: delete /lembretes/:id**

### Deletar todos os lembretes existentes.

**Requisição: delete /lembretes**

## Respostas:
### As seguintes respostas podem ser enviadas pela API:

#### 200 OK

A requisição foi bem sucedida e o resultado é retornado no corpo da resposta.

#### 201 Created

Um novo lembrete foi criado com sucesso.

#### 204 No Content

A requisição foi bem sucedida e não há conteúdo para ser retornado.

#### 400 Bad Request

A requisição não pôde ser processada devido a um erro no corpo da requisição ou nos parâmetros da URL.

#### 404 Not Found

O lembrete solicitado não foi encontrado.

#### 500 Internal Server Error

O servidor encontrou um erro ao processar a requisição.

## Essa API foi desenvolvida com o uso das seguintes tecnologias: 
### Express

Framework para Node.js que facilita a criação de aplicativos web e APIs. Ele fornece uma camada de abstração para lidar com rotas, manipulação de solicitações e respostas HTTP, gerenciamento de sessões, entre outras funcionalidades.
MongoDB Atlas
Serviço de banco de dados gerenciado na nuvem permitindo o uso do MongoDB sem a necessidade de configurar e gerenciar a infraestrutura do banco de dados. Com o MongoDB Atlas, é possível ter alta disponibilidade, escalabilidade automática, backups regulares e segurança avançada para os dados armazenados no banco de dados.

### Mongoose 

Biblioteca Node.js que oferece um ORM (Object-Relational Mapping) para o MongoDB. Ele simplifica o acesso ao banco de dados, permitindo definir modelos de dados e consultas de forma mais fácil e intuitiva.

#### Essas tecnologias, se relacionam com: 
	**Conteúdo Estático:** O Express pode ser utilizado para lidar com conteúdo estático, como por exemplo arquivos HTML, CSS e JS. Já o Mongoose, é usado para interagir com o MongoDB para armazenar os dados da aplicação, juntos, Express e Mongoose permitem criar aplicativos WEB escaláveis que podem ser tanto estáticos quanto renderizados pelo servidor. 
    
	**Microsserviços:** Express e o Mongoose podem ser usados para criar microsserviços, que são aplicativos independentes que se comunicam por meio de APIs. O Express é usado para criar a camada web do microsserviços, definindo rotas e manipulando solicitações e respostas HTTP. Já o  Mongoose é usado para definir modelos de dados e consultas ao banco de dados MongoDB, que é compartilhado entre os microsserviços, permitindo criar microsserviços escaláveis que compartilham dados em um ambiente distribuído.


