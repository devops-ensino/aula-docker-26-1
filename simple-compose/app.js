const http = require('http');
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);

const server = http.createServer(async (req, res) => {
  try {
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('mensagens');

    const mensagem = { texto: 'Olá do Docker Compose!', data: new Date() };
    await collection.insertOne(mensagem);

    const mensagens = await collection.find().toArray();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mensagens));
  } catch (error) {
    res.writeHead(500);
    res.end('Erro ao conectar ao MongoDB');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

