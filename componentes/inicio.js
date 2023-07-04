const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    welcomeMessage: String
  }
`);

const root = {
  welcomeMessage: () => 'Bem-vindo à To Do List',
};

const app = express();
const port = 3000;

app.use('/inicio', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`API GraphQL rodando na porta ${port}`);
});
