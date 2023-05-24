const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const userSchema = new mongoose.Schema({

    username: String,
    password: String

});

const User = mongoose.model('User', userSchema);

// Configuração para autenticação com JWT
const secret = 'auth-api-test';


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifica as credenciais
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Crie o token 
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

    res.json({ token });
});

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
};

app.get('/lembretes', authenticateToken, async (req, res) => {
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

app.post('/lembretes', authenticateToken, async (req, res) => {
    try {
        const lembrete = new Lembrete(req.body);
        await lembrete.save();
        res.status(201).send(lembrete);
    } catch (error) {
        res.status(500).send(error);
    }
});


// atualiza um lembrete existente
app.put('/lembretes/:id', authenticateToken, async (req, res) => {
    try {
        const lembrete = await Lembrete.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ message: "Lembrete atualizado com sucesso." });
    } catch (error) {
        res.status(500).send(error);
    }
});

// deleta um lembrete existente
app.delete('/lembretes/:id', authenticateToken, async (req, res) => {
    try {
        const lembrete = await Lembrete.findByIdAndDelete(req.params.id);
        res.status(200).send('Lembrete deletado com sucesso.');
    } catch (error) {
        res.status(500).send(error);
    }
});

// deleta todos os lembretes
app.delete('/lembretes', authenticateToken, async (req, res) => {
    try {
        await Lembrete.deleteMany();
        res.send('Todos os lembretes foram deletados');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
