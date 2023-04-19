const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

app.use(express.json());

const uri = "mongodb+srv://maurojuniorpf170:dVegIlPx9npPtxUn@tarefas.fhtcpa9.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Tarefas';

MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db(dbName);
  const ColecaoTarefas = db.collection('Tarefas');

  app.get('/tarefas', async (req, res) => {
    const tarefas = await ColecaoTarefas.find().toArray();
    res.json(tarefas);
  });

  app.post('/tarefas', async (req, res) => {
    const tarefa = {
      nome: req.body.nome,
      assunto: req.body.assunto,
      notas: req.body.notas,
      data: req.body.data,
      horario: req.body.horario,
    

    };

    const result = await ColecaoTarefas.insertOne(tarefa);

    tarefa.id = result.insertedId;

    res.status(201).json(tarefa);
  });

  app.put('/tarefas/:id', async (req, res) => {
    const tarefaId = req.params.id;
    const tarefa = await ColecaoTarefas.findOne({ _id: ObjectId(tarefaId) });

    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }

    tarefa.nome = req.body.nome;
    tarefa.assunto = req.body.assunto;
    tarefa.notas = req.body.notas;
    tarefa.data = req.body.data;
    tarefa.horario = req.body.horario;
   


    await ColecaoTarefas.updateOne({ _id: ObjectId(tarefaId) }, { $set: tarefa });

    res.json(tarefa);
  });

  app.delete('/tarefas/:id', async (req, res) => {
    const tarefaId = req.params.id;
    const result = await ColecaoTarefas.deleteOne({ _id: ObjectId(tarefaId) });

    if (result.deletedCount === 0) {
      return res.status(404).send('Tarefa não encontrada.');
    }

    res.sendStatus(204);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor Rodando. Porta: ${port}`));
});
