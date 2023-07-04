const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3002;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://maurojuniorpf170:dVegIlPx9npPtxUn@tarefas.fhtcpa9.mongodb.net/?retryWrites=true&w=majority', {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {

    console.log('Conectado ao Banco com sucesso.');

}).catch((error) => {

    console.log('Erro ao conectar ao Banco: ' + error);
});


const lembreteSchema = new mongoose.Schema({

    nome: String,
    assunto: String,
    notas: String,
    dataHora: Date,
});

const Lembrete = mongoose.model('lembretes', lembreteSchema);


// obtem todos os lembretes do banco
app.get('/lembretes', async (req, res) => {
    try {
        
        const lembretes = await Lembrete.find();
       
        if (lembretes.length === 0) {
            res.status(404).send({ error: 'Lembrete não encontrado' });
            return;
        }
       
        res.send(lembretes);
    } catch (error) {
        res.status(500).send(error);
    }
});


// adiciona um lembrete ao banco
app.post('/lembretes', async (req, res) => {
    
    try {
       
        const lembrete = new Lembrete(req.body);
        await lembrete.save();
        res.status(201).send(lembrete);
  
    } catch (error) {
        res.status(500).send(error);
    }
});


// atualiza um lembrete existente
app.put('/lembretes/:id', async (req, res) => {
  
    try {
       
        const lembrete = await Lembrete.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ message: "Lembrete atualizado com sucesso." });
  
    } catch (error) {
        res.status(500).send(error);
    }
});

// deleta um lembrete existente
app.delete('/lembretes/:id', async (req, res) => {
  
    try {
     
        const lembrete = await Lembrete.findByIdAndDelete(req.params.id);
        res.status(200).send('Lembrete deletado com sucesso.');
 
    } catch (error) {
        res.status(500).send(error);
    }
});

// deleta todos os lembretes
app.delete('/lembretes', async (req, res) => {
    
    try {
      
        await Lembrete.deleteMany();
        res.send('Todos os lembretes foram deletados');
   
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('Servidor rodando na porta 3002');
});