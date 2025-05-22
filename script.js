import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const server = express();
const PORT = 8000;

app.get('/generate-id', (req, res) => {
    const randomId = uuidv4();
    res.send({ id: randomId });
});

app.listen(8000, () => {
    console.log('servidor rodando na porta 8000');
});

server.use(express.json());

server.post('/logs', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).send({ error: 'Nome do aluno é obrigatório' });
    }

    const id = uuidv4();
    const logMessage = `Aluno: ${nome}, ID: ${id}\n`;

    fs.appendFile('logs.txt', logMessage, (err) => {
        if (err) {
            return res.status(500).send({ error: 'Erro ao salvar o log' });
        }
        res.send({ message: 'Log registrado com sucesso', id });
    });
});