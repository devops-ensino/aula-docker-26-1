const http = require('http');
http.createServer((req, res) => {
  res.end('Ola TURMA DEVOPS, mundo com Docker!!');
}).listen(3000);

