import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const server = express();
const PORT = 8000;

app.get('/generate-id', (req, res) => {
    const randomId = uuidv4();
    res.send({ id: randomId });
});

app.listen(8000, () => {
    console.log('servidor rodando na porta 8000');
});