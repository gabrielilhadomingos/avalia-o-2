import { randomUUID } from "crypto";
import express from "express";
import fs from "fs";

const server = express();
const PORT = 8000;

server.use(express.json());

server.post("/logs/registros", (request, response) => {
  const body = request.body;

  const user = {
    id: randomUUID(),
    dateRequested: new Date(),
    name: body.name,
  };

  if (!body.name) {
    return response.status(400).send("Nome é obrigatorio");
  }

  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo:", err);
      return response.status(500).send("Internal Server Error");
    }

    const logs = data ? JSON.parse(data) : [];
    logs.push(user);

    fs.writeFile("logs.txt", JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        return response.status(500).send("Internal Server Error");
      }

      return response.status(201).json(user);
    });
  });
});

server.post("/logs", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).send("Nome é obrigatorio");
  }

  const mensagem = {
    id: randomUUID(),
    mensagem: "",
  };

  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo:", err);
      return response.status(500).json("Internal Server Error");
    }

    const logs = data ? JSON.parse(data) : [];
    mensagem.mensagem = "Log criado com sucesso!"
    logs.push(mensagem);

    fs.writeFile("logs.txt", JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        console.error("Erro ao escrever arquivo:", err);
        return response.status(500).send("Internal Server Error");
      }

      return response
        .status(200)
        .json({ id: mensagem.id, mensagem: mensagem.mensagem });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});